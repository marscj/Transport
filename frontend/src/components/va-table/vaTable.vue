<template>
  <a-table :columns="columns" :dataSource="data" bordered striped>
    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
    <span slot="customTitle"></span>
    <span slot="tags" slot-scope=""></span>
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;">Invite 一 {{record.name}}</a>
      <a href="javascript:;">Delete</a>
      <a href="javascript:;" class="ant-dropdown-link">More actions</a>
    </span>
  </a-table> 
</template>

<script>
// import "ant-design-vue/lib/table/style/css";

const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
export default {
  name: "va-table",
  data() {
    return {
      data,
      columns
    };
  }
};
</script>

<style lang="scss" >
.ant-table-body {
  tr {
    &:nth-of-type(even) {
      td {
        background-color: #fafafa;
      }
    }
  }
}
</style>