import React from "react";
import { Avatar, Menu, UnstyledButton } from "@mantine/core";

const ProfileMenu = ({ user, logout }) => {
  if (!user) return null;

  return (
    <Menu withinPortal width={200} shadow="md" position="bottom-end">
      <Menu.Target>
        <UnstyledButton aria-label="Open profile menu" type="button">
          <Avatar src={user?.picture} alt="User" radius="50%" size={36} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Favourites</Menu.Item>
        <Menu.Item>Booking</Menu.Item>
        <Menu.Item onClick={() => {
          localStorage.clear();
          logout();
        }}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
