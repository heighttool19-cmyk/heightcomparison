'use client';

import React, { useState } from 'react';
import { set, unset, type ObjectInputProps } from 'sanity';
import {
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Inline,
  Stack,
  Text,
  TextArea,
  TextInput,
} from '@sanity/ui';
import { AddIcon, RemoveIcon, ClipboardIcon, TrashIcon } from '@sanity/icons';

interface TableRow {
  _key: string;
  _type?: string;
  cells: string[];
}

interface TableValue {
  _type?: 'table';
  rows?: TableRow[];
}

const genKey = () => Math.random().toString(36).substring(2, 10);

function parseSpreadsheetText(text: string): string[][] {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .filter((l) => l.trim().length > 0);

  if (lines.length === 0) return [];

  const isTab = lines[0].includes('\t');

  return lines.map((line) => {
    if (isTab) {
      return line.split('\t').map((c) => c.trim());
    }
    // CSV fallback
    const cells: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    cells.push(current.trim());
    return cells;
  });
}

/**
 * CustomTableEditor
 *
 * Provides BOTH:
 *  1. Full normal cell-by-cell typing (TextInput in every cell, Tab navigation, add/remove row/col)
 *  2. Multi-cell & bulk table pasting from Google Docs, Google Sheets, or Excel
 */
export function CustomTableEditor(props: ObjectInputProps<TableValue>) {
  const { value, onChange } = props;
  const rows: TableRow[] = value?.rows || [];

  const [isPasteDialogOpen, setIsPasteDialogOpen] = useState(false);
  const [pasteContent, setPasteContent] = useState('');
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize a new blank 2x2 table
  const handleCreateTable = () => {
    const newRows: TableRow[] = [
      { _key: genKey(), _type: 'tableRow', cells: ['', ''] },
      { _key: genKey(), _type: 'tableRow', cells: ['', ''] },
    ];
    onChange(set({ _type: 'table', rows: newRows }));
  };

  // Normal cell typing
  const handleCellChange = (rowIndex: number, colIndex: number, text: string) => {
    const newRows = rows.map((r, rIdx) => {
      if (rIdx !== rowIndex) return r;
      const newCells = [...r.cells];
      newCells[colIndex] = text;
      return { ...r, cells: newCells };
    });
    onChange(set({ ...value, _type: 'table', rows: newRows }));
  };

  // Cell-level smart paste (Ctrl+V inside any cell)
  const handleCellPaste = (e: React.ClipboardEvent, startRow: number, startCol: number) => {
    const pastedText = e.clipboardData.getData('text/plain');
    if (!pastedText.includes('\t') && !pastedText.includes('\n')) {
      // Normal single-word paste, let browser handle it
      return;
    }

    e.preventDefault();
    const parsed = parseSpreadsheetText(pastedText);
    if (parsed.length === 0) return;

    const newRows = rows.map((r) => ({ ...r, cells: [...r.cells] }));

    // Expand rows if needed
    const requiredRows = startRow + parsed.length;
    const baseColCount = newRows[0]?.cells?.length || 2;
    while (newRows.length < requiredRows) {
      newRows.push({
        _key: genKey(),
        _type: 'tableRow',
        cells: Array(baseColCount).fill(''),
      });
    }

    // Expand cols if needed
    const requiredCols = Math.max(
      ...parsed.map((pLine) => startCol + pLine.length),
      baseColCount
    );
    newRows.forEach((r) => {
      while (r.cells.length < requiredCols) {
        r.cells.push('');
      }
    });

    // Write values
    parsed.forEach((line, rIdx) => {
      line.forEach((cellVal, cIdx) => {
        newRows[startRow + rIdx].cells[startCol + cIdx] = cellVal;
      });
    });

    onChange(set({ ...value, _type: 'table', rows: newRows }));
  };

  // Bulk paste modal import
  const handleBulkImport = () => {
    setError(null);
    if (!pasteContent.trim()) return;

    try {
      const parsed = parseSpreadsheetText(pasteContent);
      if (parsed.length === 0) {
        setError('No rows detected in pasted text.');
        return;
      }

      const maxCols = Math.max(...parsed.map((line) => line.length));
      const newRows: TableRow[] = parsed.map((line) => {
        const cells = [...line];
        while (cells.length < maxCols) {
          cells.push('');
        }
        return {
          _key: genKey(),
          _type: 'tableRow',
          cells,
        };
      });

      onChange(set({ _type: 'table', rows: newRows }));
      setPasteContent('');
      setIsPasteDialogOpen(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to parse table');
    }
  };

  // Add row at bottom
  const handleAddRow = () => {
    const colCount = rows[0]?.cells?.length || 2;
    const newRows = [
      ...rows,
      {
        _key: genKey(),
        _type: 'tableRow',
        cells: Array(colCount).fill(''),
      },
    ];
    onChange(set({ ...value, _type: 'table', rows: newRows }));
  };

  // Add column on right
  const handleAddColumn = () => {
    const newRows = rows.map((r) => ({
      ...r,
      cells: [...r.cells, ''],
    }));
    onChange(set({ ...value, _type: 'table', rows: newRows }));
  };

  // Remove row
  const handleRemoveRow = (rowIndex: number) => {
    if (rows.length <= 1) {
      onChange(unset());
    } else {
      const newRows = rows.filter((_, idx) => idx !== rowIndex);
      onChange(set({ ...value, _type: 'table', rows: newRows }));
    }
  };

  // Remove column
  const handleRemoveColumn = (colIndex: number) => {
    const colCount = rows[0]?.cells?.length || 0;
    if (colCount <= 1) {
      onChange(unset());
    } else {
      const newRows = rows.map((r) => ({
        ...r,
        cells: r.cells.filter((_, idx) => idx !== colIndex),
      }));
      onChange(set({ ...value, _type: 'table', rows: newRows }));
    }
  };

  // If table is empty, show easy create or paste options
  if (rows.length === 0) {
    return (
      <Card padding={4} radius={2} tone="transparent" border style={{ borderStyle: 'dashed' }}>
        <Stack space={3} style={{ textAlign: 'center' }}>
          <Text size={2} weight="bold">
            No Table Data
          </Text>
          <Text size={1} muted>
            Create an empty table to type into, or paste copied rows directly from Google Docs or Sheets.
          </Text>
          <Flex justify="center" gap={3}>
            <Button
              text="New Table (Start Typing)"
              tone="primary"
              icon={AddIcon}
              onClick={handleCreateTable}
            />
            <Button
              text="Paste from Spreadsheet / Docs"
              mode="ghost"
              icon={ClipboardIcon}
              onClick={() => {
                setError(null);
                setIsPasteDialogOpen(true);
              }}
            />
          </Flex>
        </Stack>

        {isPasteDialogOpen && renderPasteDialog()}
      </Card>
    );
  }

  function renderPasteDialog() {
    return (
      <Dialog
        header="Paste Table from Google Docs / Sheets / Excel"
        id="paste-table-dialog"
        onClose={() => setIsPasteDialogOpen(false)}
        zOffset={1000}
        width={1}
      >
        <Box padding={4}>
          <Stack space={4}>
            <Text size={1} muted>
              Copy your rows or table from Google Docs, Google Sheets, or Excel (<strong>Ctrl + C</strong>), then paste below (<strong>Ctrl + V</strong>).
            </Text>
            <TextArea
              rows={8}
              placeholder="Paste copied table rows here..."
              value={pasteContent}
              onChange={(e) => setPasteContent(e.currentTarget.value)}
            />
            {error && (
              <Text size={1} style={{ color: 'red' }}>
                {error}
              </Text>
            )}
            <Flex gap={2} justify="flex-end">
              <Button text="Cancel" mode="ghost" onClick={() => setIsPasteDialogOpen(false)} />
              <Button text="Import & Replace Table" tone="primary" onClick={handleBulkImport} />
            </Flex>
          </Stack>
        </Box>
      </Dialog>
    );
  }

  const colCount = rows[0]?.cells?.length || 0;

  return (
    <Card border radius={2} padding={3}>
      <Stack space={3}>
        {/* Toolbar */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
          <Inline space={2}>
            <Text size={1} weight="bold">
              📊 Table ({rows.length} rows × {colCount} columns)
            </Text>
          </Inline>
          <Flex gap={2} wrap="wrap">
            <Button
              text="Add Row"
              icon={AddIcon}
              fontSize={1}
              padding={2}
              mode="ghost"
              onClick={handleAddRow}
            />
            <Button
              text="Add Column"
              icon={AddIcon}
              fontSize={1}
              padding={2}
              mode="ghost"
              onClick={handleAddColumn}
            />
            <Button
              text="Paste from Docs/Sheets"
              icon={ClipboardIcon}
              fontSize={1}
              padding={2}
              mode="ghost"
              tone="primary"
              onClick={() => {
                setError(null);
                setIsPasteDialogOpen(true);
              }}
            />
            <Button
              text="Clear"
              icon={TrashIcon}
              fontSize={1}
              padding={2}
              mode="ghost"
              tone="critical"
              onClick={() => setIsConfirmClearOpen(true)}
            />
          </Flex>
        </Flex>

        {/* Scrollable Normal Typing Grid */}
        <Box style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={row._key || `row-${rIdx}`}>
                  {row.cells.map((cellText, cIdx) => (
                    <td
                      key={`cell-${rIdx}-${cIdx}`}
                      style={{
                        padding: '4px',
                        borderBottom: '1px solid var(--card-border-color, #e0e0e0)',
                        minWidth: '130px',
                      }}
                    >
                      <TextInput
                        fontSize={1}
                        padding={2}
                        value={cellText}
                        placeholder={rIdx === 0 ? `Header ${cIdx + 1}` : `Row ${rIdx}`}
                        onChange={(e) => handleCellChange(rIdx, cIdx, e.currentTarget.value)}
                        onPaste={(e) => handleCellPaste(e, rIdx, cIdx)}
                        style={{
                          fontWeight: rIdx === 0 ? 700 : 400,
                        }}
                      />
                    </td>
                  ))}
                  {/* Delete row button */}
                  <td style={{ padding: '4px', width: '36px', textAlign: 'center' }}>
                    <Button
                      icon={RemoveIcon}
                      mode="bleed"
                      tone="critical"
                      padding={2}
                      title={`Delete Row ${rIdx + 1}`}
                      onClick={() => handleRemoveRow(rIdx)}
                    />
                  </td>
                </tr>
              ))}

              {/* Bottom column delete buttons */}
              <tr>
                {Array.from({ length: colCount }).map((_, cIdx) => (
                  <td key={`del-col-${cIdx}`} style={{ textAlign: 'center', padding: '4px' }}>
                    <Button
                      icon={RemoveIcon}
                      mode="bleed"
                      tone="critical"
                      padding={2}
                      title={`Delete Column ${cIdx + 1}`}
                      onClick={() => handleRemoveColumn(cIdx)}
                    />
                  </td>
                ))}
                <td />
              </tr>
            </tbody>
          </table>
        </Box>

        <Text size={0} muted>
          💡 <strong>Tip:</strong> You can type directly in any cell, or select any cell and press <strong>Ctrl+V</strong> to paste spreadsheet rows starting at that cell.
        </Text>
      </Stack>

      {/* Dialogs */}
      {isPasteDialogOpen && renderPasteDialog()}

      {isConfirmClearOpen && (
        <Dialog
          header="Remove Table"
          id="dialog-confirm-clear"
          onClose={() => setIsConfirmClearOpen(false)}
          zOffset={1000}
        >
          <Box padding={4}>
            <Stack space={4}>
              <Text size={1}>Are you sure you want to delete this entire table?</Text>
              <Flex gap={2} justify="flex-end">
                <Button text="Cancel" mode="ghost" onClick={() => setIsConfirmClearOpen(false)} />
                <Button
                  text="Delete"
                  tone="critical"
                  onClick={() => {
                    onChange(unset());
                    setIsConfirmClearOpen(false);
                  }}
                />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Card>
  );
}

/**
 * CustomTablePreview
 *
 * Rendered by Sanity Studio's DefaultBlockObjectComponent.
 * Shows a rich, live table card in the Portable Text editor body.
 * Double-clicking this card (or clicking the "..." menu -> "Edit")
 * automatically triggers onOpen() and displays CustomTableEditor in the edit modal.
 */
export function CustomTablePreview(props: any) {
  const rows: TableRow[] = props.rows || props.value?.rows || [];
  const colCount = rows[0]?.cells?.length || 0;
  const title = props.title || 'Table';

  return (
    <Box padding={2}>
      <Stack space={3}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
          <Inline space={2}>
            <Text size={1} weight="bold">
              {title}
            </Text>
            {rows.length > 0 && (
              <Badge tone="primary" fontSize={0}>
                {rows.length} {rows.length === 1 ? 'row' : 'rows'} × {colCount} {colCount === 1 ? 'col' : 'cols'}
              </Badge>
            )}
          </Inline>
          <Text size={0} muted>
            Double-click or click &quot;...&quot; &rarr; Edit to modify cells / paste spreadsheet
          </Text>
        </Flex>

        {rows.length === 0 ? (
          <Card padding={3} radius={2} tone="transparent" style={{ textAlign: 'center', border: '1px dashed #ccc' }}>
            <Text size={1} muted>
              Empty table — Double-click to start typing cells or paste spreadsheet
            </Text>
          </Card>
        ) : (
          <Box style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <tbody>
                {rows.slice(0, 6).map((row, rIdx) => (
                  <tr
                    key={row._key || `preview-row-${rIdx}`}
                    style={{
                      backgroundColor: rIdx === 0 ? 'var(--card-muted-bg, rgba(0,0,0,0.04))' : 'transparent',
                    }}
                  >
                    {row.cells?.map((cell, cIdx) => (
                      <td
                        key={`preview-cell-${rIdx}-${cIdx}`}
                        style={{
                          padding: '6px 10px',
                          border: '1px solid var(--card-border-color, #e2e8f0)',
                          fontWeight: rIdx === 0 ? 600 : 400,
                          maxWidth: '180px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {cell || <span style={{ color: '#aaa', fontStyle: 'italic' }}>(empty)</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length > 6 && (
              <Box paddingTop={2}>
                <Text size={0} muted>
                  + {rows.length - 6} more rows...
                </Text>
              </Box>
            )}
          </Box>
        )}
      </Stack>
    </Box>
  );
}
