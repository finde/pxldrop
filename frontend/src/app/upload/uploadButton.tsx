import styles from './upload.module.scss';
import { CardState } from './upload.interface';

interface Props {
  cardState: CardState;
  fileNumber?: number;
  uploadProgress?: number;
  onClick?: () => void;
}

export function UploadButton(props: Readonly<Props>) {
  const Content: Record<CardState, string> = {
    [CardState.Default]: 'Browse file',

    [CardState.Uploading]: `Uploading (${props.uploadProgress ?? 0}%)`,

    [CardState.Done]: 'Upload more files',

    [CardState.Error]: 'Try again',
  };

  return (
    <button
      className={styles.uploadButton}
      style={{
        borderWidth:
          props.cardState === CardState.Uploading
            ? '4px'
            : '0px',
      }}
      onClick={props.onClick}
    >
      {Content[props.cardState]}

      {props.cardState === CardState.Uploading && (
        <div
          className={styles['upload-progress-bar']}
          style={{ width: `${props.uploadProgress}%` }}
        />
      )}
    </button>
  );
}
