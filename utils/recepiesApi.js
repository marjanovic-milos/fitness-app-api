exports.recepies = async (nutrients) => {
  try {
    const { minCarbs, maxCarbs, minProtein, maxProtein } = nutrients;
    const data = await fetch(
      `https://api.spoonacular.com/recipes/findByNutrients?minCarbs=${minCarbs}&maxCarbs=${maxCarbs}&maxProtein=${maxProtein}&minProtein=${minProtein}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    return await data.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
