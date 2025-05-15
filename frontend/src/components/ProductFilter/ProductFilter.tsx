import React, { useState, useMemo } from "react";
import { Button, TextField, Chip, Box } from "@mui/material";
import "./ProductFilter.scss";
import { Product } from '../../services/interfaces/Product.ts'

export const normalizeText = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

interface ProductFilterProps {
  products: Product[];
  onFilter: (filters: {
    name?: string;
    category?: string[];
    subcategories?: { [key: string]: string[] };
    priceRange?: [number, number];
    date?: string;
  }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ products, onFilter }) => {
  const [name, setName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");
  const [date, setDate] = useState("");

  // categorias dinamicamente e em ordem alfabética
  const availableCategories = useMemo(() => {
    return Array.from(new Set(products.flatMap((product) => product.category))).sort();
  }, [products]);

  // subcategorias dinamicamente e em ordem alfabética
  const availableSubcategories = useMemo(() => {
    const subcategories: Record<string, string[]> = {};
    products.forEach((product) => {
      if (product.subcategory) {
        Object.entries(product.subcategory).forEach(([key, values]) => {
          if (!subcategories[key]) {
            subcategories[key] = [];
          }
          subcategories[key] = Array.from(
            new Set([...subcategories[key], ...values])
          ).sort();
        });
      }
    });
    return subcategories;
  }, [products]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleSubcategory = (key: string, value: string) => {
    setSelectedSubcategories((prev) => {
      const currentValues = prev[key] || [];
      return {
        ...prev,
        [key]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleApplyFilters = () => {
    onFilter({
      name: name || undefined,
      category: selectedCategories.length > 0 ? selectedCategories : undefined,
      subcategories:
        Object.keys(selectedSubcategories).length > 0 ? selectedSubcategories : undefined,
      priceRange:
        priceMin !== "" && priceMax !== "" ? [Number(priceMin), Number(priceMax)] : undefined,
      date: date || undefined,
    });
  };

  return (
    <Box className="product-filter-container" sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 2 }}>
      <h3>Filtrar Produtos</h3>
      <div className="filter-group">
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Buscar por nome"
        />
      </div>
      <div className="filter-group">
        <label>Categorias:</label>
        <div className="filter-options">
          {availableCategories.map((category) => (
            <Chip
              key={category}
              label={category}
              className={`chip ${selectedCategories.includes(category) ? "selected" : ""}`}
              onClick={() => toggleCategory(category)}
            />
          ))}
        </div>
      </div>
      {Object.keys(availableSubcategories).map((key) => (
        <div className="filter-group" key={key}>
          <label>{key}:</label>
          <div className="filter-options">
            {availableSubcategories[key].map((value) => (
              <Chip
                key={value}
                label={value}
                className={`chip ${selectedSubcategories[key]?.includes(value) ? "selected" : ""}`}
                onClick={() => toggleSubcategory(key, value)}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="filter-group">
        <label>Preço (mín - máx):</label>
        <div className="price-range">
          <TextField
            label="Mín"
            type="number"
            variant="outlined"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Mín"
          />
          <TextField
            label="Máx"
            type="number"
            variant="outlined"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Máx"
          />
        </div>
      </div>
      <div className="filter-group">
        <TextField
          label="Data de Inserção"
          type="date"
          variant="outlined"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <Button
        className="apply-filters-btn"
        onClick={handleApplyFilters}
      >
        Aplicar Filtros
      </Button>
    </Box>
  );
};

export default ProductFilter;