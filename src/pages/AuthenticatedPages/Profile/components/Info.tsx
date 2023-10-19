interface IInfoProps {
  title: string;
  content: string | number | undefined;
}

export function Info({ content, title }: IInfoProps) {
  return (
    <div>
      <h3>{title}</h3>
      <span>{content}</span>
    </div>
  );
}
