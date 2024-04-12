import Button from '@/components/atom/button';
import { FormItemWithLabel } from '@/components/organism';
import clsx from 'clsx';
import React from 'react';
import { useForm } from '../use-form';
import { SubmitHandler } from 'entities';

type EditStrategyFormProps = {
  onClose: () => void;
  defaults: StrategyType;
  onSubmit: SubmitHandler<StrategyType>;
};

export type StrategyType = {
  content: string;
};

export const defaultStrategy: StrategyType = {
  content: `We pursue our objectives through educational activities carried out by Projects set-up with a long-term vision in 
different parts of the country. The Lagoon Executive Secretarial College was the first project of the organization 
established in 1973. It offered young women a specialized professional training for administrative and secretarial careers.
The Secretarial College was discontinued in 1995 so as to attend more relevant development Projects. Other projects are:

 - Wavecrest College of Hospitality, Lagos
 - Wavecrest Study Centre, Lagos
 - Afara Leadership Centre, Lagos
 - Iroto School of Hotel and Catering, Iloti (Ogun State)
 - Iroto Rural Centre, Iloti
 - Abidagba Health Centre, Iloti
 - Imoran Centre for Professional and Social Development, oyo
 - Orisun School of Hospitality, oyo
 - Lantana College of Hospitality Uzommiri Study Centre, Enugu
 - Tiebe Cultural Centre, Benin.

At our central office located in Lagos, we also run a Management Training Unit addressed to capacity building needs of NGOs and Women in Business.`,
};

export const EditStrategyForm = (props: EditStrategyFormProps) => {
  const { onClose, defaults = defaultStrategy, onSubmit } = props;

  const { handleSubmit, formValues, handleOnChange, errors } = useForm(
    defaults,
    onSubmit
  );
  return (
    <form className="px-2" onSubmit={handleSubmit}>
      <FormItemWithLabel
        name="content"
        inputType="textarea"
        label="Content"
        placeholder="Type your strategy content here"
        onChange={handleOnChange}
        value={formValues.content}
        error={errors?.content}
      />

      <div
        className={clsx(
          'flex gap-[24px] justify-center mt-[32px] pt-[16px] pb-[32px]',
          'md:mt-[40px]'
        )}
      >
        <Button
          htmlType="button"
          type="cta-inverse"
          size="modal"
          rounded={true}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button htmlType="submit" type="cta" size="modal" rounded={true}>
          Publish
        </Button>
      </div>
    </form>
  );
};
