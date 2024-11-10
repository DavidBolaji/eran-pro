import styled from "@emotion/styled";
import { Drawer, Modal } from "antd";

export const StyledModalDrawer = styled(Modal)`
  && {
    width: 902px !important;
    border-radius: 16px !important;
    .ant-modal-content {
      height: 600px !important;
      border-radius: 16px !important;
      overflow: hidden;
      padding: 0px;
    }
  }
`;

export const StyledModalMobileDrawer = styled(Drawer)`
  padding: 0 !important;
  border-radius: 20px !important;
  .ant-drawer-body {
    padding: 0 !important;
  }
`;
