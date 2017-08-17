# nodejs.github.io

server: https://demo06.herokuapp.com

config database:
  config>database.js
  'database':'mongodb://{host_name}/{database_name}'
--------------------

create a new user:
http://{server}/api/v1/users
hearders:
	Content-Type:application/json
body:

{
	"username": "test",
    "password": "123",
    "email": "example@example.com",
    "first_name":"First Name",
    "last_name":"LastName",
    "status":1
}
authennticate
http://{server}/api/v1/authenticate
hearders:
	Content-Type:application/json
body:

{
	"username":"test",
	"password":"123"
}

response:
{
    "success": true,
    "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsImxhc3RfbmFtZSI6ImluaXQiLCJmaXJzdF9uYW1lIjoiaW5pdCIsImNyZWF0ZWRBdCI6ImluaXQiLCJ1cGRhdGVBVCI6ImluaXQiLCJfX3YiOiJpbml0Iiwic3RhdHVzIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVBVCI6dHJ1ZSwic3RhdHVzIjp0cnVlLCJsYXN0X25hbWUiOnRydWUsImZpcnN0X25hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJjcmVhdGVkQXQiOiIyMDE3LTA4LTE3VDA0OjEwOjMxLjE1OVoiLCJ1cGRhdGVBVCI6IjIwMTctMDgtMTdUMDQ6MTA6MzEuMTU5WiIsIl9fdiI6MCwic3RhdHVzIjoxLCJsYXN0X25hbWUiOiJMYXN0TmFtZSIsImZpcnN0X25hbWUiOiJGaXJzdCBOYW1lIiwiZW1haWwiOiJleGFtcGxlQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkS3RaY2wvRmh2RTVLLkdSdnNHVzJ4T3lremtET0N4QVZ0bU9sTkFLZkhKZDBtQ3l1c0RrY3kiLCJ1c2VybmFtZSI6InRlc3QiLCJfaWQiOiI1OTk1MTczN2RmMGI0ZTA1MGM1ZTYxMWQifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbCxudWxsXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltudWxsXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W10sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbXX0sImlhdCI6MTUwMjk0MzIyMH0.3MxRAD9BEeX3iZ9LKDUT5mts8Dq2kjcj7xhHN1K8yA8"
}

get services
http://{server}/api/v1/services
hearders:
	Content-Type:application/json
	Authorization: token
response:
[]




----------------------
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
--------------------
GET /services/type Find all instances of the model with same type
param: type
http//:{server}/api/v1/services/type/abc
--------------------
GET /services/group Find all instances of the model with same group
param: group
http//:{server}/api/v1/services/group/abc
--------------------
GET /activeservices Find all instances with active status of the model
http//:{server}/api/v1/activeservices
--------------------
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
--------------------
GET /services/{id} Find a model instance by {{id}} from the data source.
param:id
http//:{server}/api/v1/services/59896b124381b7590872605a
--------------------
PUT /services/{id} Patch attributes for a model instance and persist it into the data source.
method:PUT
http//:{server}/api/v1/services/59896b124381b7590872605a
--------------------
GET /services/{id}/price Get the price information of this service
http//:{server}/api/v1/services/59896b124381b7590872605a/price
--------------------
GET /services/{id}/execution Get the list of execution of this service
http//:{server}/api/v1/services/59896b124381b7590872605a/execution
