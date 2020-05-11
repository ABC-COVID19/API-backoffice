import { ICategoryTree } from '../model/ICAMApi/category-tree.model';

const HIGHLIGHT_CATEGORY_NAME = 'Destaques';

export const getHighlightCategoryID = (categories: ICategoryTree[]): number | undefined => {
  const category = categories.find(cat => cat.itemName?.toLowerCase() === HIGHLIGHT_CATEGORY_NAME.toLowerCase());
  return category !== undefined ? category.id : undefined;
};

export const flatCategoryTree = (node: ICategoryTree, result: ICategoryTree[] = []): void => {
  if (node.parent === null || node.parent === undefined) {
    result.push(node);
  } else {
    result.push(node);
    flatCategoryTree(node.parent, result);
  }
};
