import MultipleSelector, { Option } from '@/components/custom/MultipleSelector';

const OPTIONS: Option[] = [
  { label: 'Important', value: 'important'},
  { label: 'Statements', value: 'statements' },
  { label: 'Utility', value: 'utility' },
  { label: 'Missing', value: 'missing' },
  { label: 'Lost', value: 'lost' },
  { label: 'Found', value: 'found' },
]

const MultipleSelectorCreatable = () => {
  return (
    <div className="w-full pl-3 pr-3">
      <MultipleSelector
        className="bg-black-bg"
        defaultOptions={OPTIONS}
        placeholder="Create a new tag or select an existing one."
        creatable
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            No results found.
          </p>
        }
      />
    </div>
  );
};

export default MultipleSelectorCreatable;
