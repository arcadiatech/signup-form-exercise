import "./FullScreenLayout.css";

export const FullScreenLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="full-screen-layout">
      <div className="full-screen-layout-header">
        <h2>Company Name</h2>
      </div>
      <div className="full-screen-layout-content">{children}</div>
    </div>
  );
};
