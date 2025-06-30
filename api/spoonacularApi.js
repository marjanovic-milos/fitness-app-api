exports.recepiesByNutrients = async (nutrients) => {
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

exports.recepieById = async (id) => {
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
