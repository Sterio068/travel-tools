"use client";

import { useState, useMemo, useCallback, useSyncExternalStore } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { COUNTRIES } from "@/data/countries";
import { STATIC_EXCHANGE_RATES } from "@/data/constants";
import { formatMoney } from "@/lib/format";

const STORAGE_KEY = "travel-expense-tracker";

interface Expense {
  id: string;
  category: string;
  amount: number;
  note: string;
  timestamp: number;
}

const CATEGORIES = [
  { key: "food", emoji: "\uD83C\uDF5C", label: "食" },
  { key: "stay", emoji: "\uD83C\uDFE8", label: "住" },
  { key: "transport", emoji: "\uD83D\uDE83", label: "交" },
  { key: "fun", emoji: "\uD83C\uDFA1", label: "玩" },
  { key: "shop", emoji: "\uD83D\uDECD", label: "購" },
  { key: "other", emoji: "\uD83D\uDCCC", label: "其他" },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c]),
) as Record<CategoryKey, (typeof CATEGORIES)[number]>;

function loadExpenses(): Expense[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveExpenses(expenses: Expense[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export default function ExpenseTracker() {
  const [countryCode, setCountryCode] = useState("");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    if (typeof window !== "undefined") return loadExpenses();
    return [];
  });
  const [category, setCategory] = useState<CategoryKey>("food");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === countryCode),
    [countryCode],
  );

  const rate = useMemo(() => {
    if (!country) return 1;
    return STATIC_EXCHANGE_RATES[country.currency] ?? 1;
  }, [country]);

  const addExpense = useCallback(() => {
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) return;

    const entry: Expense = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      category,
      amount: parsed,
      note: note.trim(),
      timestamp: Date.now(),
    };

    const updated = [entry, ...expenses];
    setExpenses(updated);
    saveExpenses(updated);
    setAmount("");
    setNote("");
  }, [amount, category, note, expenses]);

  const deleteExpense = useCallback(
    (id: string) => {
      const updated = expenses.filter((e) => e.id !== id);
      setExpenses(updated);
      saveExpenses(updated);
    },
    [expenses],
  );

  const grouped = useMemo(() => {
    const map: Record<string, Expense[]> = {};
    for (const cat of CATEGORIES) {
      const items = expenses.filter((e) => e.category === cat.key);
      if (items.length > 0) map[cat.key] = items;
    }
    return map;
  }, [expenses]);

  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses],
  );

  const totalTWD = total * rate;

  const currencySymbol = country?.currencySymbol ?? "";
  const currencyCode = country?.currency ?? "TWD";

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* 選擇目的地 */}
      <Card className="p-6">
        <Select
          label="旅行目的地"
          options={[
            { value: "", label: "-- 請選擇國家 --" },
            ...COUNTRIES.map((c) => ({ value: c.code, label: `${c.flag} ${c.nameZh}（${c.currency}）` })),
          ]}
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        />
      </Card>

      {/* 新增花費 */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold">新增花費</h3>
        <div className="grid gap-3 sm:grid-cols-[auto_1fr_1fr_auto]">
          <Select
            options={CATEGORIES.map((c) => ({ value: c.key, label: `${c.emoji} ${c.label}` }))}
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryKey)}
          />

          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder={`金額（${currencyCode}）`}
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter") addExpense();
            }}
          />

          <Input
            type="text"
            placeholder="備註（選填）"
            value={note}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNote(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter") addExpense();
            }}
          />

          <Button
            onClick={addExpense}
            className="bg-brand-500 text-white hover:bg-brand-500/90"
          >
            新增
          </Button>
        </div>
      </Card>

      {/* 總計 */}
      {expenses.length > 0 && (
        <Card className="bg-brand-500/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">總花費</p>
              <p className="text-2xl font-bold text-brand-500">
                {currencySymbol}
                {formatMoney(total)} {currencyCode}
              </p>
            </div>
            {country && currencyCode !== "TWD" && (
              <div className="text-right">
                <p className="text-sm text-gray-500">約等於</p>
                <p className="text-2xl font-bold text-accent-500">
                  NT${formatMoney(totalTWD)}
                </p>
              </div>
            )}
            <div className="text-right">
              <p className="text-sm text-gray-500">筆數</p>
              <p className="text-lg font-semibold">{expenses.length} 筆</p>
            </div>
          </div>
        </Card>
      )}

      {/* 依分類顯示 */}
      {Object.entries(grouped).map(([catKey, items]) => {
        const cat = CATEGORY_MAP[catKey as CategoryKey];
        const catTotal = items.reduce((s, e) => s + e.amount, 0);
        return (
          <Card key={catKey} className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {cat.emoji} {cat.label}
              </h3>
              <span className="font-semibold text-gray-600">
                {currencySymbol}
                {formatMoney(catTotal)}
              </span>
            </div>
            <div className="space-y-2">
              {items.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-medium">
                      {currencySymbol}
                      {formatMoney(exp.amount)}
                    </span>
                    {exp.note && (
                      <span className="ml-2 text-sm text-gray-500">
                        {exp.note}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteExpense(exp.id)}
                    className="ml-2 shrink-0 text-sm text-red-400 hover:text-red-600"
                    aria-label="刪除"
                  >
                    刪除
                  </button>
                </div>
              ))}
            </div>
          </Card>
        );
      })}

      {expenses.length === 0 && (
        <Card className="p-8 text-center text-gray-400">
          <p className="text-lg">尚無花費紀錄</p>
          <p className="text-sm">選擇目的地後開始記錄你的旅行花費吧！</p>
        </Card>
      )}
    </div>
  );
}
