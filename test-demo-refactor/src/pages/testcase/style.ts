export const testCasePageClasses = {
  page: 'flex flex-col gap-6 h-full p-6',
  header: 'card-surface p-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between',
  splitLayout: 'flex gap-4 w-full h-[calc(100vh-180px)]',
  leftPanelWrapper: 'flex-shrink-0 flex flex-col transition-all duration-300 h-full',
  splitRight: 'flex-1 min-w-0 flex flex-col',
  tableCard: 'card-surface flex-1 flex flex-col',
  tableToolbar: 'flex items-center justify-between px-4 py-3 border-b border-gray-100',
  batchBar: 'bg-blue-50 border border-blue-200 rounded-md px-4 py-2 mb-4 flex items-center justify-between',
  drawerSection: 'mb-6',
  drawerLabel: 'block text-sm font-semibold text-gray-700 mb-2',
  libraryCollapsed:
    'bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer w-12 h-full gap-3 shadow-sm hover:border-primary/60',
}

export const testCaseInlineStyles = {
  verticalText: {
    writingMode: 'vertical-rl' as const,
    textOrientation: 'mixed' as const,
    fontWeight: 500,
    letterSpacing: '0.2em',
    color: '#595959',
  },
}
