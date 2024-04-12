import React from 'react';
import clsx from 'clsx';

import Button from '@/components/atom/button';
import { FormItemWithLabel } from '../inputs';
import { useForm } from '../use-form';
import { SubmitHandler } from 'entities';

type EditValueMetricsFormProp = {
  onClose: () => void;
  defaults?: MetricsInput;
  onSubmit: SubmitHandler<MetricsInput>;
};

export type MetricsInput = {
  metricOneValue: string;
  metricOneLabel: string;
  metricTwoValue: string;
  metricTwoLabel: string;
  metricThreeValue: string;
  metricThreeLabel: string;
  metricFourValue: string;
  metricFourLabel: string;
};

export const defaultData: MetricsInput = {
  metricOneValue: '100+',
  metricOneLabel: 'Partners',
  metricTwoValue: '1M+',
  metricTwoLabel: 'Beneficiaries',
  metricThreeValue: '1000+',
  metricThreeLabel: 'Partners',
  metricFourValue: '2000+',
  metricFourLabel: 'Lorem Ipsum',
};

export const EditValueMetricsForm = (props: EditValueMetricsFormProp) => {
  const { onClose, onSubmit, defaults = defaultData } = props;
  const { handleOnChange, handleSubmit, formValues, errors } = useForm(
    defaults,
    onSubmit
  );

  return (
    <>
      <form className="px-2" onSubmit={handleSubmit}>
        <div className="flex h-[78px] gap-[10px] mb-[16px]">
          <div className="grow">
            <FormItemWithLabel
              inputType="text"
              label="Metric 1"
              name="metricOneValue"
              placeholder="Numerical value"
              onChange={handleOnChange}
              error={errors?.metricOneValue}
              value={formValues.metricOneValue}
            />
          </div>
          <div className="grow pt-[24px]">
            <FormItemWithLabel
              inputType="text"
              label=""
              name="metricOneLabel"
              placeholder="Metric Name"
              onChange={handleOnChange}
              error={errors?.metricOneLabel}
              value={formValues.metricOneLabel}
            />
          </div>
        </div>

        <div className="flex h-[78px] gap-[10px] mb-[16px]">
          <div className="grow">
            <FormItemWithLabel
              inputType="text"
              label="Metric 2"
              name="metricTwoValue"
              placeholder="Numerical value"
              onChange={handleOnChange}
              error={errors?.metricTwoValue}
              value={formValues.metricTwoValue}
            />
          </div>
          <div className="grow pt-[24px]">
            <FormItemWithLabel
              inputType="text"
              label=""
              name="metricTwoLabel"
              placeholder="Metric Name"
              onChange={handleOnChange}
              error={errors?.metricTwoLabel}
              value={formValues.metricTwoLabel}
            />
          </div>
        </div>

        <div className="flex h-[78px] gap-[10px] mb-[32px]">
          <div className="grow">
            <FormItemWithLabel
              inputType="text"
              label="Metric 3"
              name="metricThreeValue"
              placeholder="Numerical value"
              onChange={handleOnChange}
              error={errors?.metricThreeValue}
              value={formValues.metricThreeValue}
            />
          </div>
          <div className="grow pt-[24px]">
            <FormItemWithLabel
              inputType="text"
              label=""
              name="metricThreeLabel"
              placeholder="Metric Name"
              onChange={handleOnChange}
              error={errors?.metricThreeLabel}
              value={formValues.metricThreeLabel}
            />
          </div>
        </div>

        <div className="flex h-[78px] gap-[10px] mb-[32px]">
          <div className="grow">
            <FormItemWithLabel
              inputType="text"
              label="Metric 4"
              name="metricFourValue"
              placeholder="Numerical value"
              onChange={handleOnChange}
              error={errors?.metricFourValue}
              value={formValues.metricFourValue}
            />
          </div>
          <div className="grow pt-[24px]">
            <FormItemWithLabel
              inputType="text"
              label=""
              name="metricFourLabel"
              placeholder="Metric Name"
              onChange={handleOnChange}
              error={errors?.metricFourLabel}
              value={formValues.metricFourLabel}
            />
          </div>
        </div>

        <div
          className={clsx(
            'flex gap-[24px] justify-center mt-[32px] pt-[16px] pb-[32px]',
            'md:mt-[40px]'
          )}
        >
          <Button
            htmlType={'button'}
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
    </>
  );
};
