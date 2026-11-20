'use client';

import React, { useState } from 'react';
import { set, type ObjectInputProps } from 'sanity';
import { Button, Dialog, TextArea, Stack, Text, Box, Flex } from '@sanity/ui';

interface TableValue {
  _type?: 'table';
  rows?: Array<{
    _key?: string;
    _type?: 'tableRow';
    cells?: string[];
  }>;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Custom Sanity Input component for @sanity/table.
 * Adds a one-click "Paste Table from Google Docs / Sheets" feature
 * that accepts copied spreadsheet rows and populates the Sanity table.
 */
export function TablePasteInput(props: ObjectInputProps<TableValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleImport = () => {
    setError(null);
    if (!pastedText.trim()) return;

    try {
      const rawLines = pastedText
        .trim()
        .split(/\r?\n/)
        .filter((l) => l.trim().length > 0);

      if (rawLines.length === 0) {
        setError('No rows found in the pasted content.');
        return;
      }

      // Detect delimiter: tab (Google Docs / Sheets / Excel) vs comma (CSV)
      const firstLine = rawLines[0];
      const isTab = firstLine.includes('\t');

      const rows = rawLines.map((line) => {
        const cells = isTab
          ? line.split('\t').map((c) => c.trim())
          : parseCsvLine(line);

        return {
          _key: Math.random().toString(36).substring(2, 10),
          _type: 'tableRow' as const,
          cells,
        };
      });

      // Normalize row cell counts to match maximum column width
      const maxCols = Math.max(...rows.map((r) => r.cells.length));
      rows.forEach((r) => {
        while (r.cells.length < maxCols) {
          r.cells.push('');
        }
      });

      props.onChange(
        set({
          _type: 'table',
          rows,
        })
      );

      setPastedText('');
      setIsOpen(false);
    } catch (e: any) {
      setError(`Failed to parse table: ${e.message}`);
    }
  };

  return (
    <Stack space={3}>
      <Flex justify="flex-end">
        <Button
          text="📋 Paste Table from Google Docs / Sheets"
          mode="ghost"
          tone="primary"
          fontSize={1}
          padding={2}
          onClick={() => {
            setError(null);
            setIsOpen(true);
          }}
        />
      </Flex>

      {/* Render default Sanity table editor */}
      {props.renderDefault(props)}

      {isOpen && (
        <Dialog
          header="Paste Table from Google Docs / Sheets / Excel"
          id="paste-table-dialog"
          onClose={() => setIsOpen(false)}
          zOffset={1000}
          width={1}
        >
          <Box padding={4}>
            <Stack space={4}>
              <Text size={1} muted>
                Copy your rows or entire table from Google Docs, Google Sheets, or Excel (<strong>Ctrl + C</strong>), then paste below (<strong>Ctrl + V</strong>).
              </Text>

              <TextArea
                rows={10}
                placeholder="Paste copied table rows here..."
                value={pastedText}
                onChange={(e) => setPastedText(e.currentTarget.value)}
              />

              {error && (
                <Text size={1} style={{ color: 'red' }}>
                  {error}
                </Text>
              )}

              <Flex gap={2} justify="flex-end">
                <Button
                  text="Cancel"
                  mode="ghost"
                  onClick={() => setIsOpen(false)}
                />
                <Button
                  text="Import Table"
                  tone="primary"
                  onClick={handleImport}
                />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Stack>
  );
}

