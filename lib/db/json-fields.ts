/**
 * json-fields.ts
 *
 * SQLite does not support a native JSON column type, so all fields that were
 * originally `Json` in the PostgreSQL schema are stored as `String` in SQLite.
 *
 * This module provides:
 *  1. A registry of every formerly-Json field (model → field name[]).
 *  2. Generic serialize / deserialize helpers.
 *  3. Per-model typed helpers that wrap Prisma create/update/findUnique/findMany
 *     so callers never have to remember to call JSON.stringify / JSON.parse manually.
 *
 * Usage:
 *   import { tripChangeLogs, systemSettings } from "@/lib/db/json-fields";
 *
 *   // write
 *   await tripChangeLogs.create({ data: { ..., oldValue: { price: 100 }, newValue: { price: 120 } } });
 *
 *   // read – returns parsed objects, not raw strings
 *   const log = await tripChangeLogs.findUnique({ where: { id } });
 *   console.log(log?.oldValue); // { price: 100 }
 */

import { prisma } from "@/lib/prisma";
import type {
  TripChangeLog,
  PaymentTransaction,
  PaymentWebhook,
  Notification,
  AdminAuditLog,
  SystemActivityLog,
  TelegramBotUpdate,
  AiAction,
  Subscription,
  SystemSetting,
  SystemSettingHistory,
  AnalyticsEvent,
  TripRecommendation,
  Prisma,
} from "@prisma/client";

// ---------------------------------------------------------------------------
// 1. Registry – which field on which model was formerly Json
// ---------------------------------------------------------------------------

export const JSON_FIELDS = {
  TripChangeLog:        ["oldValue", "newValue"]                   as const,
  PaymentTransaction:   ["responseData"]                           as const,
  PaymentWebhook:       ["payload"]                                as const,
  Notification:         ["data"]                                   as const,
  AdminAuditLog:        ["oldValues", "newValues"]                 as const,
  SystemActivityLog:    ["context"]                                as const,
  TelegramBotUpdate:    ["payload"]                                as const,
  AiAction:             ["parameters"]                             as const,
  Subscription:         ["features"]                              as const,
  SystemSetting:        ["settingValue"]                           as const,
  SystemSettingHistory: ["oldValue", "newValue"]                   as const,
  AnalyticsEvent:       ["metadata"]                               as const,
  TripRecommendation:   ["recommendationReason"]                   as const,
} as const;

export type JsonFieldMap = typeof JSON_FIELDS;
export type JsonModelName = keyof JsonFieldMap;

// ---------------------------------------------------------------------------
// 2. Low-level serialize / deserialize
// ---------------------------------------------------------------------------

/** Stringify every JSON-field value before writing to SQLite. */
export function serializeJsonFields<T extends Record<string, unknown>>(
  model: JsonModelName,
  data: T,
): T {
  const fields = JSON_FIELDS[model] as readonly string[];
  const result = { ...data };
  for (const field of fields) {
    if (Object.prototype.hasOwnProperty.call(result, field)) {
      const v = result[field];
      result[field] = v === undefined || v === null
        ? (v as unknown)
        : JSON.stringify(v);
    }
  }
  return result as T;
}

/** Parse every JSON-field string after reading from SQLite. */
export function deserializeJsonFields<T extends Record<string, unknown>>(
  model: JsonModelName,
  row: T | null,
): T | null {
  if (row === null) return null;
  const fields = JSON_FIELDS[model] as readonly string[];
  const result = { ...row };
  for (const field of fields) {
    if (Object.prototype.hasOwnProperty.call(result, field)) {
      const v = result[field];
      if (typeof v === "string") {
        try {
          result[field] = JSON.parse(v);
        } catch {
          // leave as string if it cannot be parsed (plain string values)
        }
      }
    }
  }
  return result as T;
}

/** Deserialize an array of rows. */
export function deserializeJsonFieldsMany<T extends Record<string, unknown>>(
  model: JsonModelName,
  rows: T[],
): T[] {
  return rows.map((r) => deserializeJsonFields(model, r) as T);
}

// ---------------------------------------------------------------------------
// 3. Per-model typed helpers
//    Each helper exposes: create, createMany, update, updateMany,
//                         findUnique, findFirst, findMany, upsert
//    Serialization is applied automatically on write; deserialization on read.
// ---------------------------------------------------------------------------

// --- TripChangeLog ----------------------------------------------------------

type TripChangeLogJson = Omit<TripChangeLog, "oldValue" | "newValue"> & {
  oldValue: unknown;
  newValue: unknown;
};

export const tripChangeLogs = {
  async create(args: Prisma.TripChangeLogCreateArgs): Promise<TripChangeLogJson> {
    const data = serializeJsonFields("TripChangeLog", args.data as Record<string, unknown>);
    const row = await prisma.tripChangeLog.create({ ...args, data });
    return deserializeJsonFields("TripChangeLog", row as Record<string, unknown>) as TripChangeLogJson;
  },
  async findUnique(args: Prisma.TripChangeLogFindUniqueArgs): Promise<TripChangeLogJson | null> {
    const row = await prisma.tripChangeLog.findUnique(args);
    return deserializeJsonFields("TripChangeLog", row as Record<string, unknown> | null) as TripChangeLogJson | null;
  },
  async findMany(args?: Prisma.TripChangeLogFindManyArgs): Promise<TripChangeLogJson[]> {
    const rows = await prisma.tripChangeLog.findMany(args);
    return deserializeJsonFieldsMany("TripChangeLog", rows as Record<string, unknown>[]) as TripChangeLogJson[];
  },
  async update(args: Prisma.TripChangeLogUpdateArgs): Promise<TripChangeLogJson> {
    const data = serializeJsonFields("TripChangeLog", args.data as Record<string, unknown>);
    const row = await prisma.tripChangeLog.update({ ...args, data });
    return deserializeJsonFields("TripChangeLog", row as Record<string, unknown>) as TripChangeLogJson;
  },
};

// --- PaymentTransaction -----------------------------------------------------

type PaymentTransactionJson = Omit<PaymentTransaction, "responseData"> & {
  responseData: unknown;
};

export const paymentTransactions = {
  async create(args: Prisma.PaymentTransactionCreateArgs): Promise<PaymentTransactionJson> {
    const data = serializeJsonFields("PaymentTransaction", args.data as Record<string, unknown>);
    const row = await prisma.paymentTransaction.create({ ...args, data });
    return deserializeJsonFields("PaymentTransaction", row as Record<string, unknown>) as PaymentTransactionJson;
  },
  async findUnique(args: Prisma.PaymentTransactionFindUniqueArgs): Promise<PaymentTransactionJson | null> {
    const row = await prisma.paymentTransaction.findUnique(args);
    return deserializeJsonFields("PaymentTransaction", row as Record<string, unknown> | null) as PaymentTransactionJson | null;
  },
  async findMany(args?: Prisma.PaymentTransactionFindManyArgs): Promise<PaymentTransactionJson[]> {
    const rows = await prisma.paymentTransaction.findMany(args);
    return deserializeJsonFieldsMany("PaymentTransaction", rows as Record<string, unknown>[]) as PaymentTransactionJson[];
  },
  async update(args: Prisma.PaymentTransactionUpdateArgs): Promise<PaymentTransactionJson> {
    const data = serializeJsonFields("PaymentTransaction", args.data as Record<string, unknown>);
    const row = await prisma.paymentTransaction.update({ ...args, data });
    return deserializeJsonFields("PaymentTransaction", row as Record<string, unknown>) as PaymentTransactionJson;
  },
};

// --- PaymentWebhook ---------------------------------------------------------

type PaymentWebhookJson = Omit<PaymentWebhook, "payload"> & { payload: unknown };

export const paymentWebhooks = {
  async create(args: Prisma.PaymentWebhookCreateArgs): Promise<PaymentWebhookJson> {
    const data = serializeJsonFields("PaymentWebhook", args.data as Record<string, unknown>);
    const row = await prisma.paymentWebhook.create({ ...args, data });
    return deserializeJsonFields("PaymentWebhook", row as Record<string, unknown>) as PaymentWebhookJson;
  },
  async findUnique(args: Prisma.PaymentWebhookFindUniqueArgs): Promise<PaymentWebhookJson | null> {
    const row = await prisma.paymentWebhook.findUnique(args);
    return deserializeJsonFields("PaymentWebhook", row as Record<string, unknown> | null) as PaymentWebhookJson | null;
  },
  async findMany(args?: Prisma.PaymentWebhookFindManyArgs): Promise<PaymentWebhookJson[]> {
    const rows = await prisma.paymentWebhook.findMany(args);
    return deserializeJsonFieldsMany("PaymentWebhook", rows as Record<string, unknown>[]) as PaymentWebhookJson[];
  },
  async update(args: Prisma.PaymentWebhookUpdateArgs): Promise<PaymentWebhookJson> {
    const data = serializeJsonFields("PaymentWebhook", args.data as Record<string, unknown>);
    const row = await prisma.paymentWebhook.update({ ...args, data });
    return deserializeJsonFields("PaymentWebhook", row as Record<string, unknown>) as PaymentWebhookJson;
  },
};

// --- Notification -----------------------------------------------------------

type NotificationJson = Omit<Notification, "data"> & { data: unknown };

export const notifications = {
  async create(args: Prisma.NotificationCreateArgs): Promise<NotificationJson> {
    const data = serializeJsonFields("Notification", args.data as Record<string, unknown>);
    const row = await prisma.notification.create({ ...args, data });
    return deserializeJsonFields("Notification", row as Record<string, unknown>) as NotificationJson;
  },
  async findUnique(args: Prisma.NotificationFindUniqueArgs): Promise<NotificationJson | null> {
    const row = await prisma.notification.findUnique(args);
    return deserializeJsonFields("Notification", row as Record<string, unknown> | null) as NotificationJson | null;
  },
  async findMany(args?: Prisma.NotificationFindManyArgs): Promise<NotificationJson[]> {
    const rows = await prisma.notification.findMany(args);
    return deserializeJsonFieldsMany("Notification", rows as Record<string, unknown>[]) as NotificationJson[];
  },
  async update(args: Prisma.NotificationUpdateArgs): Promise<NotificationJson> {
    const data = serializeJsonFields("Notification", args.data as Record<string, unknown>);
    const row = await prisma.notification.update({ ...args, data });
    return deserializeJsonFields("Notification", row as Record<string, unknown>) as NotificationJson;
  },
};

// --- AdminAuditLog ----------------------------------------------------------

type AdminAuditLogJson = Omit<AdminAuditLog, "oldValues" | "newValues"> & {
  oldValues: unknown;
  newValues: unknown;
};

export const adminAuditLogs = {
  async create(args: Prisma.AdminAuditLogCreateArgs): Promise<AdminAuditLogJson> {
    const data = serializeJsonFields("AdminAuditLog", args.data as Record<string, unknown>);
    const row = await prisma.adminAuditLog.create({ ...args, data });
    return deserializeJsonFields("AdminAuditLog", row as Record<string, unknown>) as AdminAuditLogJson;
  },
  async findUnique(args: Prisma.AdminAuditLogFindUniqueArgs): Promise<AdminAuditLogJson | null> {
    const row = await prisma.adminAuditLog.findUnique(args);
    return deserializeJsonFields("AdminAuditLog", row as Record<string, unknown> | null) as AdminAuditLogJson | null;
  },
  async findMany(args?: Prisma.AdminAuditLogFindManyArgs): Promise<AdminAuditLogJson[]> {
    const rows = await prisma.adminAuditLog.findMany(args);
    return deserializeJsonFieldsMany("AdminAuditLog", rows as Record<string, unknown>[]) as AdminAuditLogJson[];
  },
  async update(args: Prisma.AdminAuditLogUpdateArgs): Promise<AdminAuditLogJson> {
    const data = serializeJsonFields("AdminAuditLog", args.data as Record<string, unknown>);
    const row = await prisma.adminAuditLog.update({ ...args, data });
    return deserializeJsonFields("AdminAuditLog", row as Record<string, unknown>) as AdminAuditLogJson;
  },
};

// --- SystemActivityLog ------------------------------------------------------

type SystemActivityLogJson = Omit<SystemActivityLog, "context"> & { context: unknown };

export const systemActivityLogs = {
  async create(args: Prisma.SystemActivityLogCreateArgs): Promise<SystemActivityLogJson> {
    const data = serializeJsonFields("SystemActivityLog", args.data as Record<string, unknown>);
    const row = await prisma.systemActivityLog.create({ ...args, data });
    return deserializeJsonFields("SystemActivityLog", row as Record<string, unknown>) as SystemActivityLogJson;
  },
  async findMany(args?: Prisma.SystemActivityLogFindManyArgs): Promise<SystemActivityLogJson[]> {
    const rows = await prisma.systemActivityLog.findMany(args);
    return deserializeJsonFieldsMany("SystemActivityLog", rows as Record<string, unknown>[]) as SystemActivityLogJson[];
  },
};

// --- TelegramBotUpdate ------------------------------------------------------

type TelegramBotUpdateJson = Omit<TelegramBotUpdate, "payload"> & { payload: unknown };

export const telegramBotUpdates = {
  async create(args: Prisma.TelegramBotUpdateCreateArgs): Promise<TelegramBotUpdateJson> {
    const data = serializeJsonFields("TelegramBotUpdate", args.data as Record<string, unknown>);
    const row = await prisma.telegramBotUpdate.create({ ...args, data });
    return deserializeJsonFields("TelegramBotUpdate", row as Record<string, unknown>) as TelegramBotUpdateJson;
  },
  async findUnique(args: Prisma.TelegramBotUpdateFindUniqueArgs): Promise<TelegramBotUpdateJson | null> {
    const row = await prisma.telegramBotUpdate.findUnique(args);
    return deserializeJsonFields("TelegramBotUpdate", row as Record<string, unknown> | null) as TelegramBotUpdateJson | null;
  },
  async findMany(args?: Prisma.TelegramBotUpdateFindManyArgs): Promise<TelegramBotUpdateJson[]> {
    const rows = await prisma.telegramBotUpdate.findMany(args);
    return deserializeJsonFieldsMany("TelegramBotUpdate", rows as Record<string, unknown>[]) as TelegramBotUpdateJson[];
  },
  async update(args: Prisma.TelegramBotUpdateUpdateArgs): Promise<TelegramBotUpdateJson> {
    const data = serializeJsonFields("TelegramBotUpdate", args.data as Record<string, unknown>);
    const row = await prisma.telegramBotUpdate.update({ ...args, data });
    return deserializeJsonFields("TelegramBotUpdate", row as Record<string, unknown>) as TelegramBotUpdateJson;
  },
};

// --- AiAction ---------------------------------------------------------------

type AiActionJson = Omit<AiAction, "parameters"> & { parameters: unknown };

export const aiActions = {
  async create(args: Prisma.AiActionCreateArgs): Promise<AiActionJson> {
    const data = serializeJsonFields("AiAction", args.data as Record<string, unknown>);
    const row = await prisma.aiAction.create({ ...args, data });
    return deserializeJsonFields("AiAction", row as Record<string, unknown>) as AiActionJson;
  },
  async findUnique(args: Prisma.AiActionFindUniqueArgs): Promise<AiActionJson | null> {
    const row = await prisma.aiAction.findUnique(args);
    return deserializeJsonFields("AiAction", row as Record<string, unknown> | null) as AiActionJson | null;
  },
  async findMany(args?: Prisma.AiActionFindManyArgs): Promise<AiActionJson[]> {
    const rows = await prisma.aiAction.findMany(args);
    return deserializeJsonFieldsMany("AiAction", rows as Record<string, unknown>[]) as AiActionJson[];
  },
  async update(args: Prisma.AiActionUpdateArgs): Promise<AiActionJson> {
    const data = serializeJsonFields("AiAction", args.data as Record<string, unknown>);
    const row = await prisma.aiAction.update({ ...args, data });
    return deserializeJsonFields("AiAction", row as Record<string, unknown>) as AiActionJson;
  },
};

// --- Subscription -----------------------------------------------------------

type SubscriptionJson = Omit<Subscription, "features"> & { features: unknown };

export const subscriptions = {
  async create(args: Prisma.SubscriptionCreateArgs): Promise<SubscriptionJson> {
    const data = serializeJsonFields("Subscription", args.data as Record<string, unknown>);
    const row = await prisma.subscription.create({ ...args, data });
    return deserializeJsonFields("Subscription", row as Record<string, unknown>) as SubscriptionJson;
  },
  async findUnique(args: Prisma.SubscriptionFindUniqueArgs): Promise<SubscriptionJson | null> {
    const row = await prisma.subscription.findUnique(args);
    return deserializeJsonFields("Subscription", row as Record<string, unknown> | null) as SubscriptionJson | null;
  },
  async findMany(args?: Prisma.SubscriptionFindManyArgs): Promise<SubscriptionJson[]> {
    const rows = await prisma.subscription.findMany(args);
    return deserializeJsonFieldsMany("Subscription", rows as Record<string, unknown>[]) as SubscriptionJson[];
  },
  async update(args: Prisma.SubscriptionUpdateArgs): Promise<SubscriptionJson> {
    const data = serializeJsonFields("Subscription", args.data as Record<string, unknown>);
    const row = await prisma.subscription.update({ ...args, data });
    return deserializeJsonFields("Subscription", row as Record<string, unknown>) as SubscriptionJson;
  },
};

// --- SystemSetting ----------------------------------------------------------

type SystemSettingJson = Omit<SystemSetting, "settingValue"> & { settingValue: unknown };

export const systemSettings = {
  async create(args: Prisma.SystemSettingCreateArgs): Promise<SystemSettingJson> {
    const data = serializeJsonFields("SystemSetting", args.data as Record<string, unknown>);
    const row = await prisma.systemSetting.create({ ...args, data });
    return deserializeJsonFields("SystemSetting", row as Record<string, unknown>) as SystemSettingJson;
  },
  async findUnique(args: Prisma.SystemSettingFindUniqueArgs): Promise<SystemSettingJson | null> {
    const row = await prisma.systemSetting.findUnique(args);
    return deserializeJsonFields("SystemSetting", row as Record<string, unknown> | null) as SystemSettingJson | null;
  },
  async findMany(args?: Prisma.SystemSettingFindManyArgs): Promise<SystemSettingJson[]> {
    const rows = await prisma.systemSetting.findMany(args);
    return deserializeJsonFieldsMany("SystemSetting", rows as Record<string, unknown>[]) as SystemSettingJson[];
  },
  async update(args: Prisma.SystemSettingUpdateArgs): Promise<SystemSettingJson> {
    const data = serializeJsonFields("SystemSetting", args.data as Record<string, unknown>);
    const row = await prisma.systemSetting.update({ ...args, data });
    return deserializeJsonFields("SystemSetting", row as Record<string, unknown>) as SystemSettingJson;
  },
  async upsert(args: Prisma.SystemSettingUpsertArgs): Promise<SystemSettingJson> {
    const create = serializeJsonFields("SystemSetting", args.create as Record<string, unknown>);
    const update = serializeJsonFields("SystemSetting", args.update as Record<string, unknown>);
    const row = await prisma.systemSetting.upsert({ ...args, create, update });
    return deserializeJsonFields("SystemSetting", row as Record<string, unknown>) as SystemSettingJson;
  },
};

// --- SystemSettingHistory ---------------------------------------------------

type SystemSettingHistoryJson = Omit<SystemSettingHistory, "oldValue" | "newValue"> & {
  oldValue: unknown;
  newValue: unknown;
};

export const systemSettingHistory = {
  async create(args: Prisma.SystemSettingHistoryCreateArgs): Promise<SystemSettingHistoryJson> {
    const data = serializeJsonFields("SystemSettingHistory", args.data as Record<string, unknown>);
    const row = await prisma.systemSettingHistory.create({ ...args, data });
    return deserializeJsonFields("SystemSettingHistory", row as Record<string, unknown>) as SystemSettingHistoryJson;
  },
  async findMany(args?: Prisma.SystemSettingHistoryFindManyArgs): Promise<SystemSettingHistoryJson[]> {
    const rows = await prisma.systemSettingHistory.findMany(args);
    return deserializeJsonFieldsMany("SystemSettingHistory", rows as Record<string, unknown>[]) as SystemSettingHistoryJson[];
  },
};

// --- AnalyticsEvent ---------------------------------------------------------

type AnalyticsEventJson = Omit<AnalyticsEvent, "metadata"> & { metadata: unknown };

export const analyticsEvents = {
  async create(args: Prisma.AnalyticsEventCreateArgs): Promise<AnalyticsEventJson> {
    const data = serializeJsonFields("AnalyticsEvent", args.data as Record<string, unknown>);
    const row = await prisma.analyticsEvent.create({ ...args, data });
    return deserializeJsonFields("AnalyticsEvent", row as Record<string, unknown>) as AnalyticsEventJson;
  },
  async findMany(args?: Prisma.AnalyticsEventFindManyArgs): Promise<AnalyticsEventJson[]> {
    const rows = await prisma.analyticsEvent.findMany(args);
    return deserializeJsonFieldsMany("AnalyticsEvent", rows as Record<string, unknown>[]) as AnalyticsEventJson[];
  },
};

// --- TripRecommendation -----------------------------------------------------

type TripRecommendationJson = Omit<TripRecommendation, "recommendationReason"> & {
  recommendationReason: unknown;
};

export const tripRecommendations = {
  async create(args: Prisma.TripRecommendationCreateArgs): Promise<TripRecommendationJson> {
    const data = serializeJsonFields("TripRecommendation", args.data as Record<string, unknown>);
    const row = await prisma.tripRecommendation.create({ ...args, data });
    return deserializeJsonFields("TripRecommendation", row as Record<string, unknown>) as TripRecommendationJson;
  },
  async findMany(args?: Prisma.TripRecommendationFindManyArgs): Promise<TripRecommendationJson[]> {
    const rows = await prisma.tripRecommendation.findMany(args);
    return deserializeJsonFieldsMany("TripRecommendation", rows as Record<string, unknown>[]) as TripRecommendationJson[];
  },
  async update(args: Prisma.TripRecommendationUpdateArgs): Promise<TripRecommendationJson> {
    const data = serializeJsonFields("TripRecommendation", args.data as Record<string, unknown>);
    const row = await prisma.tripRecommendation.update({ ...args, data });
    return deserializeJsonFields("TripRecommendation", row as Record<string, unknown>) as TripRecommendationJson;
  },
};
