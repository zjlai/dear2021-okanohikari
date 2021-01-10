export interface LetterInterface {
  letter: string;
  avatarImg: string;
  avatarBg: string;
  timestamp?: Date;
}

export interface LetterUploadInterface {
  letter: string
  avatarImg: File | null
  avatarBg: string
  timestamp?: Date;
}
