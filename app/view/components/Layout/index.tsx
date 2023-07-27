import React, { useState, useEffect, ReactNode } from "react";
import Header from "@/components/Header";
import styles from './index.module.scss'
interface IProps {
  children: ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <>
      <div className={styles["layout"]}>
        <Header />
        {children}
      </div>
    </>
  );
}
