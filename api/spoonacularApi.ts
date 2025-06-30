interface RecepiesByNutrientsParams {
  maxCarbs?: string;
  minCarbs?: string;
  maxProtein?: string;
  minProtein?: string;
}

exports.recepiesByNutrients = async (
  nutrients: RecepiesByNutrientsParams
): Promise<any> => {
  try {
    const { maxCarbs, minCarbs, maxProtein, minProtein } = nutrients;

    const params = new URLSearchParams();

    if (minCarbs) params.append("minCarbs", minCarbs);
    if (maxCarbs) params.append("maxCarbs", maxCarbs);
    if (minProtein) params.append("minProtein", minProtein);
    if (maxProtein) params.append("maxProtein", maxProtein);

    const url = `${
      process.env.SPOONACULAR_NUTRIENTS_URL
    }?${params.toString()}&apiKey=${process.env.SPOONACULAR_API_KEY}`;

    const data = await fetch(url);
    return await data.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

interface Nutrients {
  maxCarbs?: string;
  minCarbs?: string;
  maxProtein?: string;
  minProtein?: string;
}

interface Recipe {
  // Add properties as needed based on the expected response structure
  [key: string]: any;
}

exports.recepieById = async (id: string): Promise<Recipe> => {
  try {
    const recepie = await fetch(
      `${process.env.SPOONACULAR_RECEPIES_URL}/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    return await recepie.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
