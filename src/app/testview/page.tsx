"use client";

import React, { useState } from "react";
import SelectableButtons from "@/components/SelectableButtons";

const TestView = () => {
  const [options, setOptions] = useState(["Kandy", "Colombo", "Gampaha"]);
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div>
      <SelectableButtons
        options={options}
        selected={selected}
        onChange={setSelected}
        allowAddMore={true}
      />
      <div>
        Selected: {selected.join(", ")}
      </div>
    </div>
  );
};

export default TestView;