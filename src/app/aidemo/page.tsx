"use client";

import { Button, Container, Divider, Group, Text, Title } from "@mantine/core";
import { useState } from "react";
import { RecommendationResults } from "../../features/Recommend/RecommendationResults";
import { Form } from "./form";
import { mockRecommendationData } from "./mockData";
import classes from "./page.module.css";

export default function Page() {
  const [showMockData, setShowMockData] = useState(false);

  const handleShowMock = () => {
    setShowMockData(true);
  };

  const handleHideMock = () => {
    setShowMockData(false);
  };

  return (
    <Container size="lg" px="lg" py={80}>
      <Form />

      <Divider my="xl" />

      <div className={classes.mockSection}>
        <Title order={4} mb="md">
          デモ機能
        </Title>
        <Text c="dimmed" size="sm" mb="md">
          実際の推薦結果を確認したい場合は、以下のボタンでサンプルデータを表示できます。
        </Text>
        <Group gap="md">
          <Button
            variant="outline"
            color="blue"
            onClick={handleShowMock}
            disabled={showMockData}
          >
            サンプル結果を表示
          </Button>
          {showMockData && (
            <Button variant="subtle" color="gray" onClick={handleHideMock}>
              サンプル結果を非表示
            </Button>
          )}
        </Group>
      </div>

      {showMockData && (
        <RecommendationResults results={mockRecommendationData} />
      )}
    </Container>
  );
}
