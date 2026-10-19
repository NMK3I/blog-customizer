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

import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const [radioGroupKey, setRadioGroupKey] = useState(0);

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  useOutsideClickClose({
    isOpen: isSidebarOpen,
    rootRef,
    onChange: setIsSidebarOpen,
  });

  const handleFormChange =
    (field: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormState((prev) => ({ ...prev, [field]: option }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
    setRadioGroupKey((prev) => prev + 1);
  };

  return (
    <>
      <ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
      <aside
        className={clsx(styles.container, isSidebarOpen && styles.container_open)}
        ref={rootRef}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            ЗАДАЙТЕ ПАРАМЕТРЫ
          </Text>
          <Select
            title="ШРИФТ"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={handleFormChange('fontFamilyOption')}
          />
          <RadioGroup
            key={radioGroupKey}
            name="fontSize"
            title="РАЗМЕР ШРИФТА"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleFormChange('fontSizeOption')}
          />
          <Select
            title="ЦВЕТ ШРИФТА"
            options={fontColors}
            selected={formState.fontColor}
            onChange={handleFormChange('fontColor')}
          />
          <Separator />
          <Select
            title="ЦВЕТ ФОНА"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={handleFormChange('backgroundColor')}
          />
          <Select
            title="ШИРИНА КОНТЕНТА"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={handleFormChange('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
