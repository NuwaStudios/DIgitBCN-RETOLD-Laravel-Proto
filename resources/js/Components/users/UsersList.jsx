import React, { useState, useEffect } from 'react'
import { Table, Spin, Select, Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import axios from 'axios'
import Header from '../header/Header'

function UsersList () {
  const apiURL = 'http://localhost/api'

  const [dbUsers, setDbUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [roleFilters, setRoleFilters] = useState([])
  const [simplifiedRoles, setSimplifiedRoles] = useState([])
  const [selectedRoleValues, setSelectedRoleValues] = useState({})
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  /* loading spinner */
  const [loading, setLoading] = useState(true)
  const customSpinner = (
    <div role='status'>
      <svg aria-hidden='true' className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-700' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
        <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
      </svg>
      <span className='sr-only'>Loading...</span>
    </div>
  )

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const filters = simplifiedRoles.map(role => ({ text: role.name, value: role.id }))

    setRoleFilters(filters)
  }, [simplifiedRoles])

  const fetchData = async () => {
    try {
      const users = await getUsers()
      const roles = await getRoles()

      setSimplifiedRoles(roles.map((role) => ({ id: role.id, name: role.name })))

      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const getUsers = async () => {
    try {
      const response = await axios.get(`${apiURL}/users`)
      setDbUsers(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  const getRoles = async () => {
    try {
      const response = await axios.get(`${apiURL}/roles`)
      setRoles(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching roles:', error)
      throw error
    }
  }

  const handleRoleChange = async (value, record) => {
    try {
      const updatedUsers = dbUsers.map((user) => {
        if (user.id === record.id) {
          return { ...user, role_id: value }
        }
        return user
      })
      setDbUsers(updatedUsers)

      setSelectedRoleValues((prevValues) => ({ ...prevValues, [record.id]: value }))

      await axios.patch(`${apiURL}/users/${record.id}`, { role_id: value })
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleIsEnabledChange = async (record) => {
    try {
      const updatedUsers = dbUsers.map((user) => {
        if (user.id === record.id) {
          const updatedUser = { ...user, is_enabled: user.is_enabled === 1 ? 0 : 1 }
          return updatedUser
        }
        return user
      })
      setDbUsers(updatedUsers)

      await axios.patch(`${apiURL}/users/${record.id}`, { is_enabled: updatedUsers.find(user => user.id === record.id).is_enabled })
    } catch (error) {
      console.error('Error updating is_enabled status:', error)
    }
  }

  const handleSearch = (selectedKeys = [], confirm = () => { }, dataIndex = '') => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)

    const searchInput = document.getElementById('search-input')
    if (searchInput) {
      searchInput.focus()
    }
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
    setSearchedColumn('')
    handleSearch()
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          id='search-input'
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size='small' style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        const searchInput = document.getElementById('search-input')
        if (searchInput) {
          setTimeout(() => searchInput.select(), 100)
        }
      }
    },
    render: text =>
      searchedColumn === dataIndex
        ? (
            searchText
              ? (
                <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[searchText]}
                  autoEscape
                  textToHighlight={text.toString()}
                />
                )
              : (
                  text
                )
          )
        : (
            text
          )
  })

  /* column definitions */
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text) => <span>{text.toLowerCase()}</span>,
      sorter: (a, b) => a.email.localeCompare(b.email)
    },
    {
      title: 'Roles',
      dataIndex: 'role_id',
      filters: roleFilters,
      onFilter: (value, record) => record.role_id === value,
      render: (_, record) => (
        <Select
          value={selectedRoleValues[record.id] || record.role_id}
          style={{ width: 120 }}
          mode='single'
          onChange={(value) => handleRoleChange(value, record)}
        >
          {simplifiedRoles.map((role) => (
            <Select.Option key={role.id} value={role.id}>
              {role.name}
            </Select.Option>
          ))}
        </Select>
      )
    },
    // {
    //   title: 'Museum',
    //   dataIndex: 'entityId',
    //   sorter: (a, b) => a.entityName.localeCompare(b.entityName),
    //   render: (entityId, record) => (
    //     <Link to={`/museums/${entityId}`}>{record.entityName}</Link>
    //   )
    // },
    {
      title: 'Enabled',
      dataIndex: 'is_enabled',
      render: (is_enabled, record) => (
        <input
          type='checkbox'
          onChange={() => handleIsEnabledChange(record)}
          checked={Number(is_enabled) === 1}
          style={{ cursor: 'pointer' }}
        />
      ),
      sorter: (a, b) => {
        const aEnabled = Number(a.is_enabled) === 1
        const bEnabled = Number(b.is_enabled) === 1

        if (aEnabled && !bEnabled) {
          return 1
        } else if (!aEnabled && bEnabled) {
          return -1
        } else {
          return 0
        }
      }
    }
  ]

  return (
    <>
      <div className='m-4'>
        <Header title='Users' breadcrumb={['Users', 'List']} />
        {loading
          ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Spin indicator={customSpinner} />
            </div>
            )
          : (
            <Table
              dataSource={dbUsers.map(user => ({ ...user, key: user.id }))}
              columns={columns}
              pagination={{ pageSize: 8 }}
            />
            )}
      </div>
    </>
  )
}

export default UsersList
