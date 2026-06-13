'use client';

import { useState, useTransition } from 'react';
import { classNames } from '@/shared/helpers/classNames';
import { humanizeKey, isImageField, isMultiline } from '../../helpers/fields';
import { ImageField } from '../ImageField';
import styles from './ContentEditor.module.scss';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type SaveResult = { ok: boolean; error?: string };

type ContentEditorProps = {
  section: string;
  initial: unknown;
  action: (section: string, json: string) => Promise<SaveResult>;
};

export function ContentEditor({ section, initial, action }: ContentEditorProps) {
  const [data, setData] = useState<JsonValue>(initial as JsonValue);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  function save() {
    setStatus(null);
    startTransition(async () => {
      const result = await action(section, JSON.stringify(data));
      setStatus({ ok: result.ok, text: result.ok ? 'Сохранено' : result.error ?? 'Ошибка' });
    });
  }

  return (
    <div className={styles.editor}>
      <FieldNode label="" name={section} value={data} onChange={setData} root />

      <div className={styles.bar}>
        <button type="button" className={styles.save} onClick={save} disabled={pending}>
          {pending ? 'Сохранение…' : 'Сохранить'}
        </button>
        {status ? (
          <span className={classNames(styles.status, status.ok ? styles.ok : styles.fail)}>
            {status.text}
          </span>
        ) : null}
      </div>
    </div>
  );
}

type NodeProps = {
  label: string;
  name: string;
  value: JsonValue;
  onChange: (value: JsonValue) => void;
  root?: boolean;
};

function FieldNode({ label, name, value, onChange, root }: NodeProps) {
  if (Array.isArray(value)) {
    return <ArrayNode label={label} name={name} value={value} onChange={onChange} />;
  }
  if (value !== null && typeof value === 'object') {
    return <ObjectNode label={label} value={value} onChange={onChange} root={root} />;
  }
  if (typeof value === 'number') {
    return (
      <label className={styles.row}>
        <span className={styles.label}>{humanizeKey(label || name)}</span>
        <input
          type="number"
          className={styles.input}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </label>
    );
  }
  if (typeof value === 'boolean') {
    return (
      <label className={styles.checkboxRow}>
        <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />
        <span className={styles.label}>{humanizeKey(label || name)}</span>
      </label>
    );
  }

  const str = value == null ? '' : String(value);

  if (isImageField(name, str)) {
    return (
      <div className={styles.row}>
        <span className={styles.label}>{humanizeKey(label || name)}</span>
        <ImageField value={str} onChange={(next) => onChange(next)} />
      </div>
    );
  }

  if (isMultiline(str)) {
    return (
      <label className={styles.row}>
        <span className={styles.label}>{humanizeKey(label || name)}</span>
        <textarea
          className={styles.textarea}
          rows={Math.min(10, Math.max(3, str.split('\n').length + 1))}
          value={str}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  return (
    <label className={styles.row}>
      <span className={styles.label}>{humanizeKey(label || name)}</span>
      <input
        type="text"
        className={styles.input}
        value={str}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

type ObjectNodeProps = {
  label: string;
  value: { [key: string]: JsonValue };
  onChange: (value: JsonValue) => void;
  root?: boolean;
};

function ObjectNode({ label, value, onChange, root }: ObjectNodeProps) {
  return (
    <fieldset className={classNames(styles.group, root && styles.rootGroup)}>
      {label ? <legend className={styles.legend}>{humanizeKey(label)}</legend> : null}
      {Object.entries(value).map(([key, child]) => (
        <FieldNode
          key={key}
          label={key}
          name={key}
          value={child}
          onChange={(next) => onChange({ ...value, [key]: next })}
        />
      ))}
    </fieldset>
  );
}

type ArrayNodeProps = {
  label: string;
  name: string;
  value: JsonValue[];
  onChange: (value: JsonValue[]) => void;
};

function ArrayNode({ label, name, value, onChange }: ArrayNodeProps) {
  function addItem() {
    const template = value.length > 0 ? cloneValue(value[value.length - 1]) : '';
    onChange([...value, blankTemplate(template)]);
  }

  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{humanizeKey(label || name)}</legend>
      {value.map((item, index) => (
        <div key={index} className={styles.arrayItem}>
          <div className={styles.arrayItemHead}>
            <span className={styles.arrayIndex}>#{index + 1}</span>
            <button
              type="button"
              className={styles.remove}
              onClick={() => onChange(value.filter((_, i) => i !== index))}
            >
              Удалить
            </button>
          </div>
          <FieldNode
            label=""
            name={name}
            value={item}
            onChange={(next) => onChange(value.map((current, i) => (i === index ? next : current)))}
          />
        </div>
      ))}
      <button type="button" className={styles.add} onClick={addItem}>
        + Добавить
      </button>
    </fieldset>
  );
}

function cloneValue(value: JsonValue): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}

/** Очищает строковые листья шаблона нового элемента (кроме изображений-ключей). */
function blankTemplate(value: JsonValue): JsonValue {
  if (typeof value === 'string') return '';
  if (typeof value === 'number') return 0;
  if (Array.isArray(value)) return [];
  if (value !== null && typeof value === 'object') {
    const out: { [key: string]: JsonValue } = {};
    for (const [key, child] of Object.entries(value)) out[key] = blankTemplate(child);
    return out;
  }
  return value;
}
