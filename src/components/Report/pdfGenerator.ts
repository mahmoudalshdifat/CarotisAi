// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – PDF Report Generator (using jsPDF)
// ──────────────────────────────────────────────────────────────────────────────

import jsPDF from 'jspdf';
import type { CarotidAnalysisResult } from '../../types';

function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

export function generatePDF(result: CarotidAnalysisResult): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const PAGE_W = 210;
  const MARGIN = 18;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  const LINE_H = 6;
  let y = MARGIN;

  // ── Header ────────────────────────────────────────────────────────────────
  doc.setFillColor(14, 165, 233); // sky-500
  doc.rect(0, 0, PAGE_W, 22, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('CarotisAi – Carotid Artery Analysis Report', MARGIN, 14);
  y = 30;

  // ── Meta ──────────────────────────────────────────────────────────────────
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date(result.timestamp).toLocaleString()}`, MARGIN, y);
  doc.text(`Image: ${result.imageFileName}`, MARGIN, y + 5);
  doc.text(`Analysis ID: ${result.id}`, MARGIN, y + 10);
  y += 18;

  // ── Disclaimer box ────────────────────────────────────────────────────────
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(MARGIN, y, CONTENT_W, 18, 2, 2, 'FD');
  doc.setTextColor(120, 53, 15);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('⚠ DISCLAIMER', MARGIN + 3, y + 6);
  doc.setFont('helvetica', 'normal');
  y = addWrappedText(doc, result.disclaimer, MARGIN + 3, y + 11, CONTENT_W - 6, 4);
  y += 6;

  const section = (title: string) => {
    doc.setFillColor(241, 245, 249);
    doc.rect(MARGIN, y, CONTENT_W, 8, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(title, MARGIN + 3, y + 5.5);
    y += 11;
  };

  const row = (label: string, value: string) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text(`${label}:`, MARGIN + 2, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(value, MARGIN + 45, y);
    y += LINE_H;
  };

  // ── Overall Risk ──────────────────────────────────────────────────────────
  section('OVERALL RISK ASSESSMENT');
  row('Risk Category', result.riskCategory.toUpperCase());
  row('AI Confidence', result.confidenceLevel);
  row('Analysis Quality', result.analysisQuality);
  y += 3;

  // ── Stenosis ─────────────────────────────────────────────────────────────
  section('STENOSIS ANALYSIS');
  const s = result.stenosisAnalysis;
  row('Grade', `${s.grade.toUpperCase()} – ${s.percentageEstimate}`);
  row('Method', s.method);
  row('Side', s.side);
  row('Haemodynamically Significant', s.hemodynamicallySignificant ? 'YES' : 'No');
  y += 3;

  // ── Plaque ────────────────────────────────────────────────────────────────
  section('PLAQUE ANALYSIS');
  const p = result.plaqueAnalysis;
  row('Plaque Present', p.present ? 'YES' : 'No');
  if (p.present) {
    row('Location', p.location);
    row('Side', p.side);
    row('Echogenicity', p.echogenicity);
    row('Texture', p.texture);
    row('Shape', p.shape);
    row('Ulcerated', p.ulcerated ? 'Yes' : 'No');
    row('Calcified', p.calcified ? 'Yes' : 'No');
    if (p.description) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(71, 85, 105);
      y = addWrappedText(doc, p.description, MARGIN + 2, y, CONTENT_W - 4, LINE_H);
    }
  }
  y += 3;

  // ── IMT ───────────────────────────────────────────────────────────────────
  section('INTIMA-MEDIA THICKNESS (IMT)');
  const i = result.imtAnalysis;
  row('Measured', i.measured ? 'Yes' : 'No');
  if (i.measured && i.value) row('Value', i.value);
  if (i.measured) row('Increased', i.increased ? 'Yes' : 'No');
  if (i.comment) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(71, 85, 105);
    y = addWrappedText(doc, i.comment, MARGIN + 2, y, CONTENT_W - 4, LINE_H);
  }
  y += 3;

  // ── Flow ──────────────────────────────────────────────────────────────────
  section('FLOW ASSESSMENT');
  const f = result.flowAnalysis;
  row('Flow Present', f.present ? 'Yes' : 'No');
  row('Turbulent', f.turbulent ? 'Yes' : 'No');
  row('Reduced PSV', f.reducedPSV ? 'Yes' : 'No');
  if (f.comment) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(71, 85, 105);
    y = addWrappedText(doc, f.comment, MARGIN + 2, y, CONTENT_W - 4, LINE_H);
  }
  y += 3;

  // Page break check
  if (y > 240) { doc.addPage(); y = MARGIN; }

  // ── Clinical Summary ──────────────────────────────────────────────────────
  section('CLINICAL SUMMARY');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  y = addWrappedText(doc, result.clinicalSummary, MARGIN + 2, y, CONTENT_W - 4, LINE_H);
  y += 5;

  // ── Recommendations ───────────────────────────────────────────────────────
  if (result.recommendations.length > 0) {
    section('RECOMMENDATIONS');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    result.recommendations.forEach((rec, idx) => {
      y = addWrappedText(doc, `${idx + 1}. ${rec}`, MARGIN + 2, y, CONTENT_W - 4, LINE_H);
      y += 2;
    });
    y += 3;
  }

  // ── Limitations ───────────────────────────────────────────────────────────
  if (result.limitations) {
    section('LIMITATIONS');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(71, 85, 105);
    y = addWrappedText(doc, result.limitations, MARGIN + 2, y, CONTENT_W - 4, LINE_H);
  }

  // ── Footer ────────────────────────────────────────────────────────────────
  const pageCount = doc.getNumberOfPages();
  for (let pg = 1; pg <= pageCount; pg++) {
    doc.setPage(pg);
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `CarotisAi · AI-Assisted Carotid Analysis · Research Tool Only · Page ${pg}/${pageCount}`,
      PAGE_W / 2,
      297 - 8,
      { align: 'center' },
    );
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  const filename = `CarotisAi_Report_${result.id.slice(0, 8)}_${new Date(result.timestamp).toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
