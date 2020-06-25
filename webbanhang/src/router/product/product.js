export default [
    {
        path: '/product/show',
        name: 'ShowProduct',
        component: () => import('../../components/Product/ShowProduct'),
        meta: {
            requiresAuth: true,
            is_admin: true
        }
    }
  ]