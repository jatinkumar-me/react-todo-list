import { ReactElement, createContext, useState } from "react";

const useSearchContext = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return { searchTerm, setSearchTerm };
};

export type SearchContextType = ReturnType<typeof useSearchContext>;

const initialSearchContext: SearchContextType = {
  searchTerm: "",
  setSearchTerm: () => {},
};

export const SearchContext = createContext<SearchContextType>(initialSearchContext);

export default function SearchProvider({
  children,
}: {
  children?: ReactElement | ReactElement[];
}) {
  return (
    <SearchContext.Provider value={useSearchContext()}>
      {children}
    </SearchContext.Provider>
  );
}
