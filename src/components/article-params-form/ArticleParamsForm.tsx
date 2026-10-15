import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/hooks/useOutsideClickClose';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  const toggleSidebar = (): void => {
    setIsOpen((prev) => !prev);
  };

  useOutsideClickClose({
    isOpen,
    rootRef,
    onChange: setIsOpen,
  });

  const handleFormChange = <K extends keyof ArticleStateType>(
    field: K,
    value: ArticleStateType[K]
  ): void => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
      <aside
        className={clsx(styles.container, isOpen && styles.container_open)}
        ref={rootRef}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Text as="h2" size={31} weight={800} uppercase>
            ЗАДАЙТЕ ПАРАМЕТРЫ
          </Text>
          <Select
            title="ШРИФТ"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={(option) => handleFormChange('fontFamilyOption', option)}
          />
          <RadioGroup
            name="fontSize"
            title="РАЗМЕР ШРИФТА"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) => handleFormChange('fontSizeOption', option)}
          />
          <Select
            title="ЦВЕТ ШРИФТА"
            options={fontColors}
            selected={formState.fontColor}
            onChange={(option) => handleFormChange('fontColor', option)}
          />
          <Separator />
          <Select
            title="ЦВЕТ ФОНА"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={(option) => handleFormChange('backgroundColor', option)}
          />
          <Select
            title="ШИРИНА КОНТЕНТА"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={(option) => handleFormChange('contentWidth', option)}
          />
          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="reset"
              type="clear"
              onClick={handleReset}
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
