import styles from './upload.module.scss';
import { CardState } from './upload.interface';
import {
  ArrowUpIcon,
  Confetti,
  HeartIcon,
  Signature,
  UploadFailedIcon,
} from './icons';
import { ReactNode } from 'react';

interface Props {
  cardState: CardState;
  fileNumber?: number;
}

export function UploadCard(props: Readonly<Props>) {
  const Content: Record<CardState, ReactNode> = {
    [CardState.Default]: (
      <div style={{ marginTop: '-30px' }}>
        <p>Share your unforgettable moments with us!</p>
        <p>Love,</p>
        <p className="signature">
          <Signature />
        </p>
      </div>
    ),

    [CardState.Uploading]: (
      <div>
        <p>Please wait until uploading finished...</p>
        <p className={styles.smalls}>
          Don’t close the page until the process is done
        </p>
      </div>
    ),

    [CardState.Done]: (
      <div>
        <p>Upload successful!</p>
        <p>Thank you,</p>
        <p className="signature">
          <Signature />
        </p>
      </div>
    ),

    [CardState.Error]: (
      <div>
        <p>Upload failed!</p>
        <p className={styles.smalls}>
          Please try again, sorry for the inconvenience
        </p>
      </div>
    ),
  };

  const uploadIcon = (
    <div>
      <div className={styles['card-icon']}>
        <div className={styles['badge-wrapper']}>
          <HeartIcon />

          {props.cardState === CardState.Uploading && (
            <div className={styles['badge-bottom']}>
              <ArrowUpIcon />
            </div>
          )}

          {props.cardState === CardState.Uploading &&
            props.fileNumber !== undefined &&
            props.fileNumber > 0 && (
              <div className={styles['badge-top']}>{props.fileNumber}</div>
            )}
        </div>
      </div>
    </div>
  );

  const ContentHeader: Record<CardState, ReactNode> = {
    [CardState.Default]: uploadIcon,

    [CardState.Uploading]: uploadIcon,

    [CardState.Done]: (
      <div style={{ margin: '-50px -20px -30px', display: 'flex' }}>
        <Confetti />
      </div>
    ),

    [CardState.Error]: (
      <div style={{ margin: '-20px', display: 'flex' }}>
        <UploadFailedIcon />
      </div>
    ),
  };

  return (
    <div className={styles.card}>
      <div className={styles['card-inner']}>
        {ContentHeader[props.cardState]}
        {Content[props.cardState]}
      </div>

      <img
        src="/flower-bottom-right.png"
        alt="flower"
        className={styles['flower-bottom-right']}
      />
    </div>
  );
}
