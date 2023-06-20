# @app.before_request
# @jwt_required(optional=True)
# def protected_routes_middleware():
#     """middleware"""
#     requested_route = request.path
#     current_user = get_jwt_identity()
#     allowed_routes = ['/api/v1/user/login']

#     if requested_route not in allowed_routes and not current_user:
#         return jsonify({'message': 'Authentication required', "success": False, "result": []}), 401
