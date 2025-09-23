import Page from "../../components/uiContainers/Page";

let apiPath: string | null = null;

// If in development, use the VITE_PROXY_TARGET from .env
// Otherwise, use the PROXY_TARGET from environment variables
if (import.meta.env.DEV) {
  apiPath = import.meta.env.VITE_PROXY_TARGET ?? null;
} else {
  apiPath =
    typeof process !== "undefined" && process.env.PROXY_TARGET ? process.env.PROXY_TARGET : null;
}
const DndPage: React.FC = () => {
  return <Page pageId={4} apiPath={apiPath} />;
};

export default DndPage;
