"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
};

const Portal = ({ children }: PortalProps) => {
  const mountElement = document.getElementById(
    "portal-root"
  ) as HTMLDivElement | null;
  const elementDiv: HTMLDivElement = document.createElement("div");

  useEffect(() => {
    if (mountElement) {
      mountElement.appendChild(elementDiv);
    }
    return () => {
      if (mountElement) {
        mountElement.removeChild(elementDiv);
      }
    };
  }, [mountElement, elementDiv]);

  return createPortal(children, elementDiv);
};

export default Portal;
