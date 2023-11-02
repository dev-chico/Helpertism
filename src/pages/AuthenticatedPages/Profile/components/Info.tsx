interface IInfoProps {
  title: string;
  content: string | number | undefined;
}

export function Info({ content, title }: IInfoProps) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <h3>{title}</h3>
      <span>{content}</span>
    </div>
  );
}
