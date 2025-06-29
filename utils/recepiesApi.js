exports.recepies = async (nutrients) => {
  try {
    const { minCarbs, maxCarbs, minProtein, maxProtein } = nutrients;

    const params = new URLSearchParams();

    if (minCarbs) params.append("minCarbs", minCarbs);
    if (maxCarbs) params.append("maxCarbs", maxCarbs);
    if (minProtein) params.append("minProtein", minProtein);
    if (maxProtein) params.append("maxProtein", maxProtein);

    const url = `${process.env.SPOONACULAR_NUTRIENTS_URL}?${params.toString()}&apiKey=${process.env.SPOONACULAR_API_KEY}`;
    const data = await fetch(url);

    return await data.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
