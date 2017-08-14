# nodejs.github.io

server: https://demo06.herokuapp.com

config database:
  config>database.js
  'database':'mongodb://{host_name}/{database_name}'
===========
GET /services Find all instances of the model
param: page; limit
http//:{server}/api/v1/services

response:
    {
        "name":"What is Lorem Ipsum?",
    	"active":true,
    	"price":[{
    		"price_origin":4000,
    		"first_price":3000,
    		"second_price":1500,
    		"third_price":1000,
    		"isCover":true,
    		"isDeductible":true,
    		"isDiscount":false
    	}],
    	"update":[{
                	"time":"2017-08-07T17:07:19.830Z",
                	"updateBy":"Lee Duong"
                }],
      "execute":[{
        "name":"Scroll a lap"
      }],
    	"type":"abc",
    	"group":"Group"
    }
==========
GET /services/type Find all instances of the model with same type
param: type
http//:{server}/api/v1/services/type/abc
=================
GET /services/group Find all instances of the model with same group
param: group
http//:{server}/api/v1/services/group/abc
================
GET /activeservices Find all instances with active status of the model
http//:{server}/api/v1/activeservices
================
POST /services Create a new instance of the model and persist it into the data source.

data type json:
{
    "name":"What is Lorem Ipsum?",
	"active":true,
	"price":[{
		"price_origin":4000,
		"first_price":3000,
		"second_price":1500,
		"third_price":1000,
		"isCover":true,
		"isDeductible":true,
		"isDiscount":false
	}],
	"update":[{
            	"time":"2017-08-07T17:07:19.830Z",
            	"updateBy":"Lee Duong"
            }],
  "execute":[{
    "name":"Scroll a lap"
  }],
	"type":"abc",
	"group":"Group"
}
http//:{server}/api/v1/services
================
GET /services/{id} Find a model instance by {{id}} from the data source.
param:id
http//:{server}/api/v1/services/59896b124381b7590872605a
================
PUT /services/{id} Patch attributes for a model instance and persist it into the data source.
method:PUT
http//:{server}/api/v1/services/59896b124381b7590872605a
================
GET /services/{id}/price Get the price information of this service
http//:{server}/api/v1/services/59896b124381b7590872605a/price
================
GET /services/{id}/execution Get the list of execution of this service
http//:{server}/api/v1/services/59896b124381b7590872605a/execution
