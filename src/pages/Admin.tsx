import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useProducts } from '../context/ProductsContext';
import type { Product } from '../types/product';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Alert from '../components/common/Alert';
import Badge from '../components/common/Badge';
import '../styles/Admin.css';

// Validation schema
const productSchema = yup.object({
  name: yup.string().required('Product name is required').min(3, 'Name must be at least 3 characters'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be greater than 0'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  image: yup.string().required('Image URL is required').url('Must be a valid URL'),
  category: yup.string().required('Category is required'),
  stock: yup
    .number()
    .typeError('Stock must be a number')
    .required('Stock is required')
    .integer('Stock must be a whole number')
    .min(0, 'Stock must be 0 or greater'),
});

type ProductFormData = yup.InferType<typeof productSchema>;

const Admin: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    mode: 'onChange',
  });

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('description', product.description);
      setValue('image', product.image);
      setValue('category', product.category);
      setValue('stock', product.stock);
    } else {
      setEditingProduct(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    reset();
  };

  const onSubmit = (data: ProductFormData) => {
    const productData = {
      name: data.name,
      price: data.price,
      description: data.description,
      image: data.image,
      category: data.category,
      stock: data.stock,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      showNotification('Product updated successfully!');
    } else {
      addProduct(productData);
      showNotification('Product added successfully!');
    }

    handleCloseModal();
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      showNotification('Product deleted successfully!');
    }
  };

  // Calculate stats
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockCount = products.filter(p => p.stock < 10).length;
  const categories = [...new Set(products.map(p => p.category))].length;

  return (
    <div className="admin-container">
      {showAlert && (
        <div className="alert-container">
          <Alert variant={alertType} onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </div>
      )}

      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p className="admin-subtitle">Manage your product inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <Card variant="gradient">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>{totalProducts}</h3>
              <p>Total Products</p>
            </div>
          </div>
        </Card>

        <Card variant="gradient">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>${totalValue.toFixed(2)}</h3>
              <p>Inventory Value</p>
            </div>
          </div>
        </Card>

        <Card variant="gradient">
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <h3>{lowStockCount}</h3>
              <p>Low Stock Items</p>
            </div>
          </div>
        </Card>

        <Card variant="gradient">
          <div className="stat-card">
            <div className="stat-icon">📂</div>
            <div className="stat-info">
              <h3>{categories}</h3>
              <p>Categories</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Products Management */}
      <div className="products-management">
        <div className="management-header">
          <h2>Product Management</h2>
          <Button variant="primary" onClick={() => handleOpenModal()} icon="➕">
            Add New Product
          </Button>
        </div>

        <div className="products-table-container">
          <Card variant="glass">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image} alt={product.name} className="table-image" />
                    </td>
                    <td>
                      <div className="product-name-cell">{product.name}</div>
                    </td>
                    <td>{product.category}</td>
                    <td className="price-cell">${product.price.toFixed(2)}</td>
                    <td className="stock-cell">{product.stock}</td>
                    <td>
                      {product.stock === 0 ? (
                        <Badge variant="danger" pill>Out of Stock</Badge>
                      ) : product.stock < 10 ? (
                        <Badge variant="warning" pill>Low Stock</Badge>
                      ) : (
                        <Badge variant="success" pill>In Stock</Badge>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Button
                          variant="primary"
                          size="small"
                          onClick={() => handleOpenModal(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="small"
                          onClick={() => handleDelete(product.id, product.name)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="medium"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Product Name"
            placeholder="Enter product name"
            {...register('name')}
            error={errors.name?.message}
            required
          />

          <div className="form-row">
            <Input
              label="Price"
              type="number"
              placeholder="0.00"
              {...register('price')}
              error={errors.price?.message}
              required
            />

            <Input
              label="Stock"
              type="number"
              placeholder="0"
              {...register('stock')}
              error={errors.stock?.message}
              required
            />
          </div>

          <Input
            label="Category"
            placeholder="e.g., Electronics, Accessories"
            {...register('category')}
            error={errors.category?.message}
            required
          />

          <Input
            label="Image URL"
            placeholder="https://example.com/image.jpg"
            {...register('image')}
            error={errors.image?.message}
            required
          />

          <div className="form-group">
            <label className="input-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              className="custom-textarea"
              placeholder="Enter product description"
              {...register('description')}
              rows={4}
            />
            {errors.description && (
              <span className="error-message">{errors.description.message}</span>
            )}
          </div>

          <div className="modal-actions">
            <Button type="submit" variant="primary" fullWidth>
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
            <Button type="button" variant="outline" fullWidth onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Admin;
