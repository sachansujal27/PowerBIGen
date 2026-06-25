"""
Generates chart images using matplotlib / seaborn / plotly.
All charts are rendered to PNG and saved as Django ImageField files.
"""
import io
import matplotlib
matplotlib.use('Agg')          # Non-interactive backend (no display needed)
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import seaborn as sns
import pandas as pd
import numpy as np
from django.core.files.base import ContentFile


# ── Shared style ──────────────────────────────────────────────────────────────
PALETTE   = ['#6366f1', '#f59e0b', '#10b981', '#ef4444',
             '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6']
BG_COLOR  = '#0f172a'   # dark navy  (matches frontend)
AX_COLOR  = '#1e293b'   # card bg
TEXT_CLR  = '#e2e8f0'   # light text
GRID_CLR  = '#334155'   # subtle grid


def _base_style(fig, ax):
    """Apply consistent dark-mode style to any chart."""
    fig.patch.set_facecolor(BG_COLOR)
    ax.set_facecolor(AX_COLOR)
    ax.tick_params(colors=TEXT_CLR, labelsize=9)
    ax.xaxis.label.set_color(TEXT_CLR)
    ax.yaxis.label.set_color(TEXT_CLR)
    ax.title.set_color(TEXT_CLR)
    for spine in ax.spines.values():
        spine.set_edgecolor(GRID_CLR)
    ax.grid(color=GRID_CLR, linestyle='--', linewidth=0.5, alpha=0.7)


def _fig_to_django_file(fig, filename: str) -> ContentFile:
    """Render figure to in-memory PNG → Django ContentFile."""
    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=150,
                bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)
    buf.seek(0)
    return ContentFile(buf.read(), name=filename)


def generate_chart(df: pd.DataFrame, chart_type: str,
                   x_col: str, y_col: str, title: str) -> ContentFile:
    """
    Main entry point — returns a ContentFile ready to save to ImageField.
    """
    generators = {
        'bar':       _bar_chart,
        'line':      _line_chart,
        'pie':       _pie_chart,
        'scatter':   _scatter_chart,
        'histogram': _histogram,
        'heatmap':   _heatmap,
        'area':      _area_chart,
        'box':       _box_plot,
    }
    fn = generators.get(chart_type)
    if fn is None:
        raise ValueError(f"Unknown chart type: {chart_type}")

    fname = f"{chart_type}_{x_col}_{y_col}.png".replace(' ', '_')
    return fn(df, x_col, y_col, title, fname)


# ── Individual chart functions ────────────────────────────────────────────────

def _bar_chart(df, x_col, y_col, title, fname):
    fig, ax = plt.subplots(figsize=(10, 5))
    data = df.groupby(x_col)[y_col].sum().reset_index()
    bars = ax.bar(data[x_col].astype(str), data[y_col],
                  color=PALETTE, edgecolor='none')
    ax.bar_label(bars, fmt='%.0f', color=TEXT_CLR, fontsize=8, padding=3)
    ax.set_title(title, fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel(x_col); ax.set_ylabel(y_col)
    plt.xticks(rotation=30, ha='right')
    _base_style(fig, ax)
    return _fig_to_django_file(fig, fname)


def _line_chart(df, x_col, y_col, title, fname):
    fig, ax = plt.subplots(figsize=(10, 5))
    data = df[[x_col, y_col]].dropna()
    ax.plot(data[x_col].astype(str), data[y_col],
            color=PALETTE[0], linewidth=2.5, marker='o',
            markersize=5, markerfacecolor=PALETTE[1])
    ax.fill_between(range(len(data)), data[y_col],
                    alpha=0.15, color=PALETTE[0])
    ax.set_title(title, fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel(x_col); ax.set_ylabel(y_col)
    plt.xticks(rotation=30, ha='right')
    _base_style(fig, ax)
    return _fig_to_django_file(fig, fname)


def _pie_chart(df, x_col, y_col, title, fname):
    fig, ax = plt.subplots(figsize=(8, 8))
    fig.patch.set_facecolor(BG_COLOR)
    data = df.groupby(x_col)[y_col].sum()
    wedges, texts, autotexts = ax.pie(
        data.values, labels=data.index,
        autopct='%1.1f%%', colors=PALETTE,
        pctdistance=0.85, startangle=140,
        wedgeprops={'edgecolor': BG_COLOR, 'linewidth': 2}
    )
    for t in texts + autotexts:
        t.set_color(TEXT_CLR)
        t.set_fontsize(9)
    ax.set_title(title, color=TEXT_CLR, fontsize=13, fontweight='bold')
    return _fig_to_django_file(fig, fname)


def _scatter_chart(df, x_col, y_col, title, fname):
    fig, ax = plt.subplots(figsize=(9, 6))
    ax.scatter(df[x_col], df[y_col],
               c=PALETTE[0], alpha=0.7, s=60,
               edgecolors=PALETTE[1], linewidths=0.5)
    # Trend line
    try:
        z = np.polyfit(pd.to_numeric(df[x_col], errors='coerce').fillna(0),
                       pd.to_numeric(df[y_col], errors='coerce').fillna(0), 1)
        p = np.poly1d(z)
        ax.plot(sorted(df[x_col]), p(sorted(df[x_col])),
                '--', color=PALETTE[2], linewidth=1.5, label='Trend')
        ax.legend(labelcolor=TEXT_CLR, facecolor=AX_COLOR)
    except Exception:
        pass
    ax.set_title(title, fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel(x_col); ax.set_ylabel(y_col)
    _base_style(fig, ax)
    return _fig_to_django_file(fig, fname)


def _histogram(df, x_col, y_col, title, fname):
    fig, ax = plt.subplots(figsize=(9, 5))
    col = y_col if y_col else x_col
    data = pd.to_numeric(df[col], errors='coerce').dropna()
    ax.hist(data, bins=20, color=PALETTE[0],
            edgecolor=BG_COLOR, linewidth=0.5)
    ax.axvline(data.mean(), color=PALETTE[1],
               linestyle='--', linewidth=1.5, label=f'Mean: {data.mean():.1f}')
    ax.legend(labelcolor=TEXT_CLR, facecolor=AX_COLOR)
    ax.set_title(title, fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel(col); ax.set_ylabel('Frequency')
    _base_style(fig, ax)
    return _fig_to_django_file(fig, fname)


def _heatmap(df, x_col, y_col, title, fname):
    fig, ax = plt.subplots(figsize=(10, 7))
    fig.patch.set_facecolor(BG_COLOR)
    num_df = df.select_dtypes(include=np.number).fillna(0)
    if num_df.empty:
        num_df = pd.DataFrame({'No numeric data': [0]})
    corr = num_df.corr()
    sns.heatmap(corr, ax=ax, annot=True, fmt='.2f',
                cmap='coolwarm', linewidths=0.5,
                linecolor=BG_COLOR,
                annot_kws={'size': 8, 'color': TEXT_CLR})
    ax.set_title(title, color=TEXT_CLR, fontsize=13, fontweight='bold', pad=12)
    ax.tick_params(colors=TEXT_CLR)
    return _fig_to_django_file(fig, fname)


def _area_chart(df, x_col, y_col, title, fname):
    fig, ax = plt.subplots(figsize=(10, 5))
    data = df[[x_col, y_col]].dropna()
    y_vals = pd.to_numeric(data[y_col], errors='coerce').fillna(0)
    ax.fill_between(range(len(data)), y_vals,
                    alpha=0.4, color=PALETTE[0])
    ax.plot(range(len(data)), y_vals,
            color=PALETTE[0], linewidth=2)
    ax.set_xticks(range(0, len(data), max(1, len(data)//10)))
    ax.set_xticklabels(
        data[x_col].astype(str).iloc[::max(1, len(data)//10)],
        rotation=30, ha='right'
    )
    ax.set_title(title, fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel(x_col); ax.set_ylabel(y_col)
    _base_style(fig, ax)
    return _fig_to_django_file(fig, fname)


def _box_plot(df, x_col, y_col, title, fname):
    fig, ax = plt.subplots(figsize=(9, 6))
    groups = df.groupby(x_col)[y_col].apply(
        lambda s: pd.to_numeric(s, errors='coerce').dropna().tolist()
    )
    bp = ax.boxplot(groups.values, labels=groups.index,
                    patch_artist=True, notch=False,
                    medianprops={'color': PALETTE[1], 'linewidth': 2})
    for patch, color in zip(bp['boxes'], PALETTE):
        patch.set_facecolor(color)
        patch.set_alpha(0.7)
    ax.set_title(title, fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel(x_col); ax.set_ylabel(y_col)
    plt.xticks(rotation=30, ha='right')
    _base_style(fig, ax)
    return _fig_to_django_file(fig, fname)