import { Dropdown } from "antd";

import { Badge, MenuProps } from "antd";
import React from "react";
import { Space } from "antd";
import { Avatar } from "../avatar/avatar";

export const DropdownCustom: React.FC<{
  items: MenuProps["items"];
  pic?: string | null;
}> = ({ items, pic = null }) => {
  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomLeft"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Badge size="default">
            <Space>
              {pic ? (
                <Avatar
                  size="sm"
                  src={pic}
                  className="md:w-14 md:h-14 w-10 h-10"
                />
              ) : (
                <Avatar size="sm" className="md:w-14 md:h-14 w-10 h-10" />
              )}
            </Space>
          </Badge>
          {/* <DownOutlined /> */}
        </Space>
      </a>
    </Dropdown>
  );
};
