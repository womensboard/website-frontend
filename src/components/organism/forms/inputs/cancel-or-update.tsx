import Button from '@/components/atom/button';
import React from 'react';

type Props = {
  onCancel?: () => void;
  htmlType?: 'submit' | 'button';
  onSubmit?: () => void;
  loading?: boolean;
  submitText: string;
};
export const CancelOrSubmit = (props: Props) => {
  const {
    onCancel,
    onSubmit,
    submitText,
    loading = false,
    htmlType = 'submit',
  } = props;
  return (
    <div className="flex justify-center mt-14">
      <Button
        onClick={onSubmit}
        htmlType={htmlType}
        type="cta"
        size="lg"
        rounded={false}
        loading={loading}
      >
        {submitText}
      </Button>
      <div className="ml-6">
        <Button
          htmlType="button"
          onClick={onCancel}
          size="lg"
          type="secondary"
          rounded={false}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
