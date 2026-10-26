import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const MailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const ArrowRightIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const PlusIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const variants = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'link',
] as const;

const sizes = ['sm', 'md', 'lg', 'icon'] as const;

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual style of the button.',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'Size of the button. Use `icon` for icon-only actions.',
      table: { defaultValue: { summary: 'md' } },
    },
    loading: {
      control: 'boolean',
      description: 'Shows a spinner, sets `aria-busy`, and disables the button.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and applies disabled styles.',
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the button to the width of its container.',
      table: { defaultValue: { summary: 'false' } },
    },
    leftIcon: {
      control: false,
      description: 'Optional icon rendered before the label.',
    },
    rightIcon: {
      control: false,
      description: 'Optional icon rendered after the label.',
    },
    asChild: {
      control: 'boolean',
      description:
        'Renders the child element instead of a native button via Radix Slot.',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
      description: 'Button label or nested content.',
    },
    className: {
      control: 'text',
      description: 'Additional classes merged with `tailwind-merge`.',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Native button type.',
      table: { defaultValue: { summary: 'button' } },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'Medium' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: PlusIcon,
    'aria-label': 'Add',
  },
};

export const WithIcons: Story = {
  args: {
    leftIcon: MailIcon,
    rightIcon: ArrowRightIcon,
    children: 'Continue',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Saving',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
