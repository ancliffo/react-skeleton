import Page from "../../components/uiContainers/Page";

const apiPath = import.meta.env.VITE_PROXY_TARGET ? import.meta.env.VITE_PROXY_TARGET : null;

const DndPage: React.FC = () => {
  return <Page pageId={4} apiPath={apiPath} />;
};

export default DndPage;
