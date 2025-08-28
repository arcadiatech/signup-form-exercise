/**
 * @description Returns a string of class names separated by spaces, where the class names are only included if the corresponding boolean is true.
 * @param conditions - An array of tuples, where the first element is the class name and the second element is a boolean indicating whether the class should be applied.
 * @returns A string of class names separated by spaces, where the class names are only included if the corresponding boolean is true.
 */

export const conditionalClassNames = (conditions: Array<[string, boolean]>) => {
  return conditions.reduce((prev, curr) => {
    const [className, condition] = curr;
    if (condition) {
      return [prev, className].join(" ");
    }
    return prev;
  }, "");
};
