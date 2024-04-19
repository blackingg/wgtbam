export function isEqual(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
) {
  // If the objects are the same instance, they are equal
  if (obj1 === obj2) {
    return true;
  }

  // If the objects are not both objects, they are not equal
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  // Get the keys of the objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // If the number of keys is different, the objects are not equal
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Recursively compare the properties of the objects
  for (const key of keys1) {
    if (
      !isEqual(
        obj1[key] as Record<string, unknown>,
        obj2[key] as Record<string, unknown>
      )
    ) {
      return false;
    }
  }

  // If all properties are equal, the objects are equal
  return true;
}
