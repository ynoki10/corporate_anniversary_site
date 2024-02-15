import useSelectedCategory from '@/hooks/useSelectedCategory';

type Props = {
  categoryName: string;
  close: () => void;
};

const CategorySelectButton = (props: Props) => {
  const { categoryName, close } = props;
  const [selectedCategory, setSelectedCategory] = useSelectedCategory();

  const isSelected = selectedCategory === categoryName;

  const onClick = () => {
    if (isSelected) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(categoryName);
    }
    close();
  };

  return (
    <button
      type="button"
      className={`rounded-md bg-sub04 py-1.5 px-2 text-sm text-main01 transition-[background-color] hover:bg-sub03 ${
        isSelected ? 'bg-sub02' : ''
      }`}
      onClick={onClick}
    >
      {categoryName}
    </button>
  );
};

export default CategorySelectButton;
