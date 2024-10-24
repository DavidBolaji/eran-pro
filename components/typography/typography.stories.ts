import { Meta, StoryObj } from "@storybook/react";
import { Typography, TypographyProps } from "./typography";

const meta: Meta<TypographyProps> = {
  title: "Typography",
  component: Typography,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    as: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
      control: {
        type: "select"
      }
    },
    size: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "c1", "c2", "s1", "s2"],
      control: {
        type: "select"
      }
    },
    align: {
      options: ["left", "center", "right"],
      control: {
        type: "select"
      }
    },
    className: {
      control: {
        type: "text"
      }
    }
  },
  args: {
    size: 'h4',
    align: 'left',
    children: "Heading"
  },
};

export default meta;

type Story = StoryObj<TypographyProps>;
export const Playground: Story = {};
