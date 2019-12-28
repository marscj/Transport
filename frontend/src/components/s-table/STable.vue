<template>
  <a-table
    bordered
    :columns="columns"
    :dataSource="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  />
</template>

<script>
import { Table } from "ant-design-vue";

export default {
  props: Object.assign({}, Table.props, {
    columns: {
      type: Array,
      default: () => []
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showPagination: {
      type: String | Boolean,
      default: "auto"
    },
    pageURI: {
      type: Boolean,
      default: false
    },
    data: {
      type: Function,
      required: true
    }
  }),
  data() {
    return {
      dataSource: [],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10
      }
    };
  },
  created() {
    const { pageNo } = this.$route.query;
    const localPageNum =
      (this.pageURI && (pageNo && parseInt(pageNo))) || this.pageNum;
    this.pagination =
      (["auto", true].includes(this.showPagination) &&
        Object.assign({}, this.pagination, {
          current: localPageNum,
          pageSize: this.pageSize,
          showSizeChanger: this.showSizeChanger
        })) ||
      false;
    this.loadData();
  },
  methods: {
    refresh(bool = false) {
      bool &&
        (this.pagination = Object.assign(
          {},
          {
            current: 1,
            pageSize: this.pageSize
          }
        ));
      this.loadData();
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.loadData(this.pagination, filters, sorter);
    },
    loadData(pagination, filters, sorter) {
      this.loading = true;

      const parameter = Object.assign(
        {
          page:
            (pagination && pagination.current) ||
            (this.showPagination && this.pagination.current) ||
            this.pageNum,
          page_size:
            (pagination && pagination.pageSize) ||
            (this.showPagination && this.pagination.pageSize) ||
            this.pageSize
        },
        (sorter &&
          sorter.field && {
            sortField: sorter.field
          }) ||
          {},
        (sorter &&
          sorter.order && {
            sortOrder: sorter.order
          }) ||
          {},
        {
          ...filters
        }
      );
      const result = this.data(parameter);
      if (
        (typeof result === "object" || typeof result === "function") &&
        typeof result.then === "function"
      ) {
        result.then(r => {
          this.pagination =
            (this.showPagination &&
              Object.assign({}, this.pagination, {
                total: r.count
              })) ||
            false;
          if (
            r.results.length === 0 &&
            this.showPagination &&
            this.pagination.current > 1
          ) {
            this.pagination.current--;
            this.loadData();
            return;
          }

          try {
            if (
              ["auto", true].includes(this.showPagination) &&
              r.totalCount <= r.pageNo * this.pagination.pageSize
            ) {
              this.pagination.hideOnSinglePage = true;
            }
          } catch (e) {
            this.pagination = false;
          }
          this.dataSource = r.results;
          this.loading = false;
        });
      }
    }
  }
};
</script>