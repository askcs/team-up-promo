'use strict';


angular.module('WebPaige.Modals.Teams', ['ngResource'])


/**
 * Teams modal
 */
.factory('Teams', 
[
    '$resource', '$config', '$q', 'Storage', '$rootScope', 
    function ($resource, $config, $q, Storage, $rootScope) 
    {
      var Teams = $resource(
        $config.host + 'teamup/team/',
        {
        },
        {
          query: {
            method: 'GET',
            params: {},
            isArray: true
          },
          get: {
            method: 'GET',
            params: {id:''}
          },
          save: {
            method: 'POST',
            params: {id:''}
          },
          edit: {
            method: 'PUT',
            params: {id:''}
          },
          remove: {
            method: 'DELETE',
            params: {id:''}
          }
//          search: {
//            method: 'POST',
//            params: {id:'', action:'searchPaigeUser'},
//            isArray: true
//          }
        }
      );


	
//		var Containers = $resource($config.host + '/node/:id/container', {
//		}, {
//			get : {
//				method : 'GET',
//				params : {
//					id : ''
//				},
//				isArray : true
//			}
//		});
//	
//		var Parents = $resource($config.host + '/parent', {
//		}, {
//			get : {
//				method : 'GET',
//				params : {},
//				isArray : true
//			}
//		});
	
		var TeamStatus = $resource($config.host + 'teamup/team/status/:teamId/', {
		}, {
			query : {
				method : 'GET',
				params : {},
				isArray : true
			}
		});
	
		var Team = $resource($config.host + 'teamup/team/:teamId/', {
		}, {
			edit : {
				method : 'PUT',
			},
			del : {
				method : 'DELETE'
			}
		});
	
		var Members = $resource($config.host + 'teamup/team/:teamId/member', {
		}, {
			save : {
				method : 'POST',
			}
		});
	
		var RemoveMembers = $resource($config.host + 'teamup/team/:teamId/removeMember', {
		}, {
			remove : {
				method : 'PUT',
			}
		});
	
		var cGroup = $resource($config.host + 'teamup/team/:teamId/clientGroups', {
		}, {
			query : {
				method : 'GET',
				params : {},
				isArray : true
			},
			add : {
				method : 'POST'
			}
		});
		
		var unAssignGroups = $resource($config.host + 'teamup/team/:teamId/unAssignClientGroups', {
		}, {
			unssign : {
				method : 'PUT',
			}
		});
		
		var updateGroups = $resource($config.host + 'teamup/team/:teamId/updateClientGroups', {
		}, {
			update : {
				method : 'PUT',
			}
		});
		
		
		
		var Member = $resource($config.host + 'teamup/team/member', {
		}, {
			save : {
				method : 'POST',
			}
		}); 
		
		var TeamTasks = $resource($config.host + 'teamup/team/:teamId/tasks', {
		}, {
			query : {
				method : 'GET',
				params : {
					from : '',
					to: ''
				}
			}
		});
		
		var MembersNotInTeam = $resource($config.host + 'teamup/team/members', {
		}, {
			query : {
				method : 'GET',
				isArray : true
			}
		}); 
//      /**
//       * Get parent team data
//       */
//      Teams.prototype.parents = function (all) 
//      {   
//        var deferred = $q.defer();
//
//        Parents.get(
//          null, 
//          function (result) 
//          {
//            if (!all)
//            {
//              // console.warn('returned ===>', result.length);
//
//              if (result.length == 0)
//              {
//                deferred.resolve(null);
//              }
//              else
//              {
//                deferred.resolve(result[0].uuid);
//              }
//            }
//            else
//            {
//              deferred.resolve(result);
//            }
//          },
//          function (error)
//          {
//            deferred.resolve({error: error});
//          }
//        );
//
//        return deferred.promise;
//      };
//
//
//      /**
//       * TODO
//       * Extract only the Teams which are in the local list
//       * 
//       * Get container (parent) team data
//       */
//      Teams.prototype.containers = function (id) 
//      {   
//        var deferred  = $q.defer(),
//            cons      = [];
//
//        Containers.get(
//          {id: id}, 
//          function (result) 
//          {
//            /**
//             * team save call returns only uuid and that is parsed as json
//             * by angular, this is a fix for converting returned object to plain string
//             */
//            angular.forEach(result, function (_r, _i)
//            {
//              var returned = [];
//
//              angular.forEach(_r, function (chr, i) { returned += chr });
//
//              cons.push(returned);
//            });
//            
//            deferred.resolve(cons);
//          },
//          function (error)
//          {
//            deferred.resolve({error: error});
//          }
//        );
//
//        return deferred.promise;
//      };
//
//
      /**
       * Add Member to a team
       */
      Teams.prototype.addMember = function (id , memberIds)
      {
        var deferred = $q.defer();
        Members.save({teamId: id },memberIds, 
          function (result) 
          {
            deferred.resolve(result);
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        );

        return deferred.promise;    
      };


      /**
       * Remove member from team
       */
      Teams.prototype.delMember = function (tId,memberIds)
      {
        var deferred = $q.defer();

        RemoveMembers.remove({teamId: tId},  memberIds,
          function (result) 
          {
            deferred.resolve(result);
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        );

        return deferred.promise;    
      };
      
      /**
       * Add client groups to a team 
       */
      Teams.prototype.addGroup = function (id , groupIds)
      {
        var deferred = $q.defer();
        cGroup.add({teamId: id },groupIds, 
          function (result) 
          {
            deferred.resolve(result);
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        );

        return deferred.promise;    
      };
      
      /**
       * Remove client group from a team
       */
      Teams.prototype.delGroup = function (tId,groupIds)
      {
        var deferred = $q.defer();

        unAssignGroups.unssign({teamId: tId},  groupIds,
          function (result) 
          {
            deferred.resolve(result);
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        );

        return deferred.promise;    
      };
      
      /**
       * Remove client group from a team
       */
      Teams.prototype.updateGroup = function (tId,changes)
      {
        var deferred = $q.defer();

        updateGroups.update({teamId: tId},  changes , 
          function (result) 
          {
            deferred.resolve(result);
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        );

        return deferred.promise;    
      };
      
      /**
       * General query function from Teams and their members
       */
      Teams.prototype.query = function (only,routePara)
      {
        var deferred = $q.defer();
        
        Teams.query(
          function (teams) 
          {
            Storage.add('Teams', angular.toJson(teams));
            
            if (!only)
            {
              var calls = [];

              angular.forEach(teams, function (team, index)
              {
                if(routePara.uuid){
                    if(routePara.uuid == team.uuid){
                        calls.push(Teams.prototype.get(team.uuid));
                    }
                }else{
                    calls.push(Teams.prototype.get(team.uuid));
                }
              });

              $q.all(calls)
              .then(function (results)
              {
//                Teams.prototype.uniqueMembers();

                var data = {};

                data.members = {};

                angular.forEach(teams, function (team, gindex)
                {
                  data.teams = teams;

                  data.members[team.uuid] = [];

                  angular.forEach(results, function (result, mindex)
                  {
                      if(routePara.uuid){
                          if (result.id == team.uuid && routePara.uuid == team.uuid){
                              data.members[team.uuid] = result.data;
                          }else{
                              data.members[team.uuid] = angular.fromJson(Storage.get(team.uuid));
                          }
                      }else{
                          if (result.id == team.uuid){
                              data.members[team.uuid] = result.data;
                          }
                      }
                        
                  });
                });

                deferred.resolve(data);
              });
            }
            else
            {
              deferred.resolve(teams);
            }
            
          },
          function (error)
          {
            console.log("Error" + error);
            deferred.resolve({error: error});
          }
        );

        return deferred.promise;
      };
      
      /**
       * General query function from Teams and their members from local storage
       */
      Teams.prototype.queryLocal = function ()
      {
        var deferred = $q.defer();
        
        var teams_local = angular.fromJson(Storage.get("Teams"));
        
        var data = {};
        data.teams = teams_local;
        
        data.members = {};
        angular.forEach(teams_local, function (team, i){
            var members = angular.fromJson(Storage.get(team.uuid));
            data.members[team.uuid] = members; 
        });
        
        deferred.resolve(data);
        
        return deferred.promise;
      };
      
      /**
       * get members of the team
       */
      Teams.prototype.queryStatus = function( teamId){
          var deferred = $q.defer();
          TeamStatus.query({
          },function(result){
              deferred.resolve({
                  id: id,
                  data: returned
              });
          },function(error){
              deferred.resolve({error: error});
          });
          
      };
      
	     
		/**
		 * Get team data
		 */
	
		Teams.prototype.get = function(id) {
			var deferred = $q.defer();
	
			TeamStatus.query({
				teamId : id
			}, function(result) {
				/**
				 * DIRTY CHECK!
				 *
				 * Check for 'null' return from back-end
				 * if team is empty
				 */
				var returned;
	
				if (result.length == 4 && result[0][0] == 'n' && result[1][0] == 'u') {
					returned = [];
				} else {
					returned = result;
				};
	
				Storage.add(id, angular.toJson(returned));
	
				deferred.resolve({
					id : id,
					data : returned
				});
			}, function(error) {
				deferred.resolve({
					error : error
				});
			});
	
			return deferred.promise;
		};

//
//
//      /**
//       * Make an inuque list of members
//       */
//      Teams.prototype.uniqueMembers = function ()
//      {
//        angular.forEach(angular.fromJson(Storage.get('Teams')), function (team, index)
//        {
//          var members = angular.fromJson(Storage.get('members')) || {};
//
//          angular.forEach(angular.fromJson(Storage.get(team.uuid)), function (member, index)
//          {
//            members[member.uuid] = member;
//          });
//
//          Storage.add('members', angular.toJson(members));
//        });
//      };
//
//
      /**
       * Save team
       */
      Teams.prototype.save = function (team) 
      {
          var deferred = $q.defer();

       
          Teams.save(
            { id: $rootScope.app.resources.uuid }, 
            team, 
            function (result) 
            {
              deferred.resolve(result);
            },
            function (error)
            {
              deferred.resolve({error: error});
            }
          ); 
        

          return deferred.promise;
      };

      Teams.prototype.saveMember = function (member){
    	  var deferred = $q.defer();
    	  Member.save({},
			  member,
			  function(result){
				  deferred.resolve(result);
			  },function(error){
				  deferred.resolve({error: error});
			  }
    	  );
    	  
    	  return deferred.promise;
      };
//
//      /**
//       * Delete team
//       */
//      Teams.prototype.remove = function (id) 
//      {
//        var deferred = $q.defer();
//
//        Teams.remove(
//          {id: id}, 
//          function (result) 
//          {
//            deferred.resolve(result);
//          },
//          function (error)
//          {
//            deferred.resolve({error: error});
//          }
//        );
//
//        return deferred.promise;
//      };
//
//
//      /**
//       * Search candidate mambers
//       */
//      Teams.prototype.search = function (query) 
//      {
//        var deferred = $q.defer();
//
//        Teams.search(
//          null, 
//          {key: query}, 
//          function (results) 
//          {
//            var processed = [];
//
//            angular.forEach(results, function (result, index)
//            {
//              processed.push({
//                id: result.id,
//                name: result.name,
//                Teams: Teams.prototype.getMemberTeams(result.id)
//              });
//            });
//
//            deferred.resolve(processed);
//          },
//          function (error)
//          {
//            deferred.resolve({error: error});
//          }
//        );
//
//        return deferred.promise;
//      };
//
//
//      /**
//       * Get Teams of given member
//       */
//      Teams.prototype.getMemberTeams = function (id)
//      {
//        var Teams = angular.fromJson(Storage.get('Teams')),
//            memberTeams = [];
//
//        angular.forEach(Teams, function (team, index)
//        {
//          var localteam = angular.fromJson(Storage.get(team.uuid));
//
//          angular.forEach(localteam, function (member, index)
//          {
//            if (member.uuid === id)
//              memberTeams.push({
//                uuid: team.uuid,
//                name: team.name
//              });
//          });
//        });
//
//        return memberTeams;
//      };
//
//
        /**
        * Save team
        */
       Teams.prototype.edit = function (team) 
       {
         var deferred = $q.defer();
    
         /**
          * Check if team id supplied
          * if save submitted from add / edit form
          */
         if (team.uuid){
           Team.edit({teamId: team.uuid}, team, function (result) 
           {
             deferred.resolve(result);
           });
         }
         else
         {
         };
    
         return deferred.promise;
       };
      
       /**
        * try  to preload the image from here, that ng-src can use the cache.
        */
       Teams.prototype.loadImg = function(imgURL){
          
          var LoadImg = $resource(
               imgURL,{
               },{
                   get : {
                       method: 'GET',
                   }
               }
         );
          
         var deferred = $q.defer();
          
         LoadImg.get(function(result){
             deferred.resolve(result); 
         },function(error){
         	deferred.resolve(error);
         }); 
         
         return deferred.promise;
       };
       
       
       
		/**
		 *  load the callin number for the team
		 */
		Teams.prototype.loadTeamCallinNumber = function(teamUuid) {
			var TeamNumber = $resource($config.host + 'teamup/team/:teamId/phone', {
			}, {
				get : {
					method : 'GET',
				}
			});

			var deferred = $q.defer();

			TeamNumber.get({
				teamId : teamUuid
			}, function(result) {
				deferred.resolve(result);
			}, function(error) {
				deferred.resolve({
					error : error
				});
			});

			return deferred.promise;
		}; 

       
		/**
		 * load the client groups belong to all the teams
		 */
		Teams.prototype.queryClientGroups = function(teams) {
			var deferred = $q.defer();

			var calls = [];
			angular.forEach(teams, function(team, index) {
				calls.push(Teams.prototype.getGroup(team.uuid));
			});
			
			$q.all(calls).then(function(results) {
				//                Teams.prototype.uniqueMembers();

				var data = {};

				data.groups = {};

				angular.forEach(teams, function(team, gindex) {
					data.teams = teams;

					data.groups[team.uuid] = [];

					angular.forEach(results, function(result, mindex) {
						data.groups[team.uuid] = result.data;
					});
				});

				deferred.resolve(data);
			});

			return deferred.promise;
		}; 


		/**
		 * get  the client group for specific team
		 */
		Teams.prototype.getGroup = function(id) {
			var deferred = $q.defer();
	
			cGroup.query({
				teamId : id
			}, function(result) {
				/**
				 * DIRTY CHECK!
				 *
				 * Check for 'null' return from back-end
				 * if team is empty
				 */
				var returned;
	
				if (result.length == 4 && result[0][0] == 'n' && result[1][0] == 'u') {
					returned = [];
				} else {
					returned = result;
				};
	
				Storage.add("teamGroup_" + id, angular.toJson(returned));
	
				deferred.resolve({
					id : id,
					data : returned
				});
			}, function(error) {
				deferred.resolve({
					error : error
				});
			});
	
			return deferred.promise;
		};

       
      
		/**
		 * add or remove the members from the teams
		 */
		Teams.prototype.manage = function(changes) {
			var deferred = $q.defer();
	
			var calls = [];
	
			angular.forEach(changes, function(change, teamId) {
				if(change.a.length > 0) {
					calls.push(Teams.prototype.addMember(teamId, {
						ids : change.a
					}));
				}
				if(change.r.length > 0) {
					calls.push(Teams.prototype.delMember(teamId, {
						ids : change.r
					}));
				}
			});
	
			$q.all(calls).then(function(results) {
				//                Teams.prototype.uniqueMembers();
				var queryCalls = [];
	
				var data = {};
	
				angular.forEach(changes, function(change, teamId) {
					queryCalls.push(Teams.prototype.get(teamId));
				});
	
				$q.all(queryCalls).then(function(results) {
					deferred.resolve(data);
				});
			});
			return deferred.promise;
		};

       	/**
       	 * add or remove the client group from the teams 
       	 */
    	Teams.prototype.manageGroups = function(changes) {
			var deferred = $q.defer();
	
			var calls = [];
	
			angular.forEach(changes, function(change, teamId) {
				if(change.a.length > 0 && change.r.length == 0) {
					calls.push(Teams.prototype.addGroup(teamId, {
						ids : change.a
					}));
				}
				if(change.r.length > 0 && change.a.length == 0) {
					calls.push(Teams.prototype.delGroup(teamId, {
						ids : change.r
					}));
				}
				if(change.a.length > 0 && change.r.length > 0){
					// to prevent the race condition when do "removing and adding " on a team at same time
					// so just create new REST call to do it backend
					calls.push(Teams.prototype.updateGroup(teamId, {
						remove : change.r,
						add : change.a
					}));

				}
			}); 
	
			$q.all(calls).then(function(changeResults) {
				
				var data = changeResults;
					
				var queryCalls = [];	
				angular.forEach(changes, function(change, teamId) {
					queryCalls.push(Teams.prototype.getGroup(teamId));
				});
	
				$q.all(queryCalls).then(function(results) {
					deferred.resolve(data);
				});
	
			});
			
			return deferred.promise;
		};   
	     
		/**
		 * get  the client group for specific team
		 */
		Teams.prototype.getTeamTasks = function(id,start,end) {
			var deferred = $q.defer();
	
			TeamTasks.query({
				teamId : id , from : start, to : end 
			}, function(result) {
				
				deferred.resolve(result);
			}, function(error) {
				deferred.resolve({
					error : error
				});
			});
	
			return deferred.promise;
		};
		
		/**
		 * get  the members that not belong to any teams 
		 */
		Teams.prototype.queryMembersNotInTeams = function() {
			var deferred = $q.defer();
	
			MembersNotInTeam.query({}, function(result) {
				
				Storage.add("members", angular.toJson(result));
				
				deferred.resolve(result);
			}, function(error) {
				deferred.resolve({
					error : error
				});
			});
	
			return deferred.promise;
		};
		
		/**
		 * Delete a team
		 */
		Teams.prototype.deleteTeam = function(id){
			var deferred = $q.defer();
			
			Team.delete({
				teamId : id  
			}, function(result) {
				deferred.resolve(result.result);
			}, function(error) {
				deferred.resolve({
					error : error
				});
			});
	
			return deferred.promise;
		}
		
      return new Teams;
    }
]);