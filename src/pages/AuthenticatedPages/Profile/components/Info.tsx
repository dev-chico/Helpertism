interface IInfoProps {
  title: string;
  content: string;
}

export function Info({ content, title }: IInfoProps) {
  return (
    <div>
      <h3>{title}</h3>
      <span>{content}</span>
    </div>
  );
}
