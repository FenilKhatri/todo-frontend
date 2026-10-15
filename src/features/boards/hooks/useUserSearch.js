import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../../shared/lib/axios";
import { USER_SEARCH_DEBOUNCE_MS, USER_SEARCH_MIN_LENGTH } from "../board.constants";

// Suggested people while the query is empty, debounced name/email search once it's long enough.
// `boardId` lets the server skip people who already have access to that board.
export default function useUserSearch(query, boardId) {
  const [response, setResponse] = useState({ key: null, users: [] });
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const term = query.trim();
  const mode = term.length >= USER_SEARCH_MIN_LENGTH ? "search" : term ? "typing" : "suggested";
  const requestTerm = mode === "search" ? term : mode === "suggested" ? "" : null;

  useEffect(() => {
    if (requestTerm === null) return;
    let ignore = false;
    const timer = setTimeout(
      () => {
        setSearching(true);
        setError("");
        api
          .get("/users/search", { params: { q: requestTerm, boardId } })
          .then((res) => !ignore && setResponse({ key: requestTerm, users: res.data.users }))
          .catch((err) => !ignore && setError(getErrorMessage(err, "Search failed")))
          .finally(() => !ignore && setSearching(false));
      },
      requestTerm ? USER_SEARCH_DEBOUNCE_MS : 0,
    );
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [requestTerm, boardId]);

  // Only show results that belong to the current query (never a previous one's).
  const results = response.key === requestTerm ? response.users : [];
  const loading = requestTerm !== null && !error && (searching || response.key !== requestTerm);

  return { term, mode, results, loading, error, minLength: USER_SEARCH_MIN_LENGTH };
}
