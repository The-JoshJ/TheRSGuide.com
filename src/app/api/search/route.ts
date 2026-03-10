import { searchPriorityKeywords, type PriorityResult } from "@/lib/search-keywords";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  if (!query) return Response.json([]);

  // Get results from keyword mappings
  const priorityResults = searchPriorityKeywords(query);

  // Convert to search result format
  const results = priorityResults.map((r: PriorityResult) => ({
    type: "page" as const,
    id: r.url,
    url: r.url,
    content: r.title,
    description: r.description,
  }));

  return Response.json(results);
}
